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
from conf.config import (MONITOR_MONGO_URL,
                         MONITOR_MONGO_DB_NAME,
                         MONITOR_MONGO_COLLECTION)
from code.utils import status
from pymongo import MongoClient
from bson.objectid import ObjectId
import time

client = MongoClient(MONITOR_MONGO_URL)
db = client[MONITOR_MONGO_DB_NAME]
collection = db[MONITOR_MONGO_COLLECTION]

class DbProcessor(object):
    '''数据库操作模块

    这个模块完成两个方面的工作:
    1. 数据的插入
    2. 数据的查找
    '''

    def __init__(self):
        pass

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
        if 'create_time' not in msg:
            msg['create_time'] = time.time()
        return (status.OK, collection.insert_one(msg))


    def get_all_ele(self):
        '''获取数据

        返回所有消息，根据消息创建时间排序

        Returns:
            status_code: 操作状态码
            ret: 所有消息组成的列表
        '''
        return (status.OK, list(collection.find().sort('create_time')))


    def get_ele_by_time_interval(self, from_time=None, to_time=None):
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
        except ValueError as error:
            return (status.ERROR, 'ValueError: %s' % error)
        return (status.OK, list(collection.find(
                    {
                        "create_time": {
                            "$gte": from_time,
                            "$lte": to_time
                        }
                    }).sort("create_time")))

    def get_ele_by_id(self, msg_id):
        '''获取消息

        根据消息 id 来获取消息

        Args:
            msg_id: 消息 id

        Returns:
            status_codez: 操作状态码
            ret: 对应的消息体
        '''
        return (status.OK, collection.find_one({'_id': ObjectId(msg_id)}))
