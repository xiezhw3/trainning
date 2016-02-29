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

import time
import logging
import schedule

from code.modules.single_agent.agent import Agent
from code.utils import status
from code.utils import time_stand
from code.utils.url_requests import common_proxy
from conf import config

PERIOD = 60  # 数据采集周期，单位为秒

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

    def start(self):
        '''启动循环监控

        这里通过 python schedule 来实现监控
        '''
        logging.info("Start agent server")
        schedule.every(self.period).seconds.do(self._process)
        while True:
            schedule.run_pending()
            time.sleep(1)

    def _process(self):
        '''进行监控，将监控数据发送到消息队列'''
        monitor_info = self._monitor()
        self._store(monitor_info)

    def _monitor(self):
        '''获取监控信息'''
        ret = {}
        if self.module != 'memory':
            (cpu_status, cpu_percent_info) = self.agent.cpu_percent(self.percpu)
            ret['cpu'] = {
                'status': cpu_status,
                'cpu_info': cpu_percent_info,
            }
        if self.module != 'cpu':
            (mem_status, memory_info) = self.agent.memory()
            ret['memory'] = {
                'status': mem_status,
                'memory_info': memory_info,
            }
        (load_status, load_avg) = self.agent.load_average()
        (ip_status, ip) = self.agent.ip_addr()
        ret.update({
            'load': {
                'status': load_status,
                'load_info': load_avg,
            },
            'ip': ip
        })
        return ret

    def _store(self, msg):
        '''将消息存储到数据库'''
        msg['create_time'] = time_stand(time.time())
        ret = common_proxy('post', config.DATA_URL, json=msg)
        logging.info(str(ret))
