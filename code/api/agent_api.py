#! /usr/bin/env python
# -*- coding: utf-8 -*-

'''
Author: xiezhw3@163.com
@contact: xiezhw3@163.com
@version: $Id$
Last modified: 2015-12-05
FileName: agent_api.py
Description: 单机 agent 的监控数据查看 restful api
'''

from flask import Flask
import sys
from conf.config import *

from code.modules.db_processor.db_processor import DbProcessor

app = Flask(__name__)
db_processor = DbProcessor()

@app.route('/')
def all():
    '''返回全部监控数据'''
    (ret_status, ret) = db_processor.get_all_ele()
    return "[ %s ]: %s" % (ret_status, str(ret))

@app.route('/<_id>')
def msg_by_id(_id):
    '''根据记录 id 返回某条记录'''
    (ret_status, ret) = db_processor.get_ele_by_id(str(_id))
    return "[ %s ]: %s" % (ret_status, str(ret))

@app.route('/<from_time>/<to_time>')
def all_interval(from_time, to_time):
    '''根据时间范围获取消息

    注意时间的格式必须为：
        time.time()
    也就是一个 float 类型的数值
    '''
    (ret_status, ret) = db_processor.get_ele_by_time_interval(from_time,
                                                              to_time)
    return "[ %s ]: %s" % (ret_status, str(ret))

def run_app():
    app.run(host=API_URL)

if __name__ == '__main__':
    run_app()
