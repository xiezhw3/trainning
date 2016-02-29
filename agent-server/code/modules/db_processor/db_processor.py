#! /usr/bin/env python
# -*- coding: utf-8 -*-

'''
Author: xiezhw3@163.com
@contact: xiezhw3@163.com
@version: $Id$
Last modified: 2015-12-05
FileName: db_processor.py
Description: 进行数据库操作
'''
from pymongo import MongoClient

from conf.config import (MONITOR_MONGO_URL,
                         MONITOR_MONGO_DB_NAME)
from code.utils import status

client = MongoClient(MONITOR_MONGO_URL)
db = client[MONITOR_MONGO_DB_NAME]


class DbProcessor(object):
    '''数据库操作模块

    这个模块完成两个方面的工作:
    1. 数据的插入
    2. 数据的查找
    '''

    def __init__(self):
        self.data_col = db['monitordata']
        self.ip_col = db['iplist']

    def insert(self, msg):
        '''进行数据的插入

        只接受字典类型的参数，也就是说，一次只能插入一个元素

        Args:
            msg: 需要插入数据库的元素

        Returns:
            status_code: 数据插入状态
            id: 插入的数据的 id
        '''
        if not isinstance(msg, dict):
            return (status.ERROR, 'Parameter error: msg is not dict type')
        if self._insert_ip(msg) == status.ERROR:
            return (status.ERROR, 'Parameter error: no machine ip')
        return (status.OK, self.data_col.insert_one(msg))

    def _insert_ip(self, msg):
        if 'ip' in msg:
            if not list(self.ip_col.find({'ip': msg['ip']})):
                self.ip_col.insert({'ip': msg['ip']})
            return status.OK
        return status.ERROR

    def get_ip_list(self):
        '''获取数据

        返回机器 ip 列表
        '''
        return (status.OK, list(self.ip_col.find()))

    def get_ele_by_time_interval(self, from_time=None, to_time=None, ip=None):
        '''获取数据

        根据消息的创建时间范围获取数据

        Args:
            from_time: 获取从创建时间是 from_time 开始的消息
            to_time: 获取到创建时间是 to_time 为止的消息
            时间格式统一为 UTC 时间

        Returns:
            status_codez: 操作状态码
            ret: 搜索结果
        '''
        try:
            from_time = float(from_time)
            to_time = float(to_time)
        except TypeError as error:
            return (status.ERROR, 'TypeError: %s' % error)
        except ValueError as error:
            return (status.ERROR, 'ValueError: %s' % error)
        if not ip:
            ip = self._get_random_ip()['ip']
        return (status.OK, list(self.data_col.find(
                    {
                        "create_time": {
                            "$gte": from_time,
                            "$lte": to_time
                        },
                        'ip': ip,
                    }).sort("create_time")))

    def _get_random_ip(self):
        return self.ip_col.find_one()
