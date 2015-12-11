#! /usr/bin/env python
# -*- coding: utf-8 -*-

'''
Author: xiezhw3@163.com
@contact: xiezhw3@163.com
@version: $Id$
Last modified: 2015-12-05
FileName: monitor.py
Description: 监控器，每隔一定时间进行系统信息的采集，
    并将采集的信息存储到数据库
'''

from code.modules.single_agent.agent import Agent
from code.modules.db_processor.db_processor import DbProcessor
from code.utils import status
import time
import threading
import logging

PERIOD = 60 # 数据采集周期，单位为秒

logging.basicConfig(format=status.DEFAULT_LOG_FORMAT,
                    datefmt=status.DEFAULT_DATE_FORMAT,
                    level=logging.INFO)

class Monitor(object):
    '''系统信息监控器
    
    根据周期，周期性地对获取系统监控信息，并将这些信息
    存储在 mongodb 数据库
    '''

    def __init__(self, period=None, percpu=False, module='all'):
        '''进行初始化操作
        
        Args:
            period: 监控周期，单位为秒，如果不提供则默认为 60s
            percpu: 是否将每个逻辑 cpu 当成独立 cpu 进行数据的采集
        '''
        if period:
            self.period = period
        else:
            self.period = PERIOD
        self.percpu = percpu
        self.module = module
        self.agent = Agent()
        self.db_processor = DbProcessor()

    def start(self):
        '''启动循环监控
        
        这里通过 threading 模块的 Timer 来实现循环监控
        '''
        self._process()
        threading.Timer(self.period, self.start).start()

    def _process(self):
        '''进行监控，并将监控结果进行存储'''
        monitor_info = self._monitor()
        if self.module == 'cpu':
            del monitor_info['momory']
        elif self.module == 'memory':
            del monitor_info['cpu']
        logging.info('Agent: %s' % str(monitor_info))  
        self._store(monitor_info)

    def _monitor(self):
        '''获取监控信息'''
        (cpu_status, cpu_percent_info) = self.agent.cpu_percent(self.percpu)
        (mem_status, memory_info) = self.agent.memory()
        (load_status, load_avg) = self.agent.load_average()

        ret = {
            'cpu': {
                'status': cpu_status,
                'percent_info': cpu_percent_info,
            },
            'memory': {
                'status': mem_status,
                'memory_info': memory_info,
            },
            'load': {
                'status': load_status,
                'load_info': load_avg,
            }
        }
        return ret

    def _store(self, msg):
        '''将消息存储到数据库'''
        msg['create_time'] = time.time()
        (ret_status, ret) = self.db_processor.insert(msg)
        if ret_status == status.OK:
            logging.info('Record with id %s has store successfully.' %
                          ret.inserted_id)
        else:
            logging.error('Record %s store fail: %s' % (str(msg), ret))
