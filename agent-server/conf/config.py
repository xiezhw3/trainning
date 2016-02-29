#! /usr/bin/env python
# -*- coding: utf-8 -*-

import os

def __set_from_environ():
    d = globals()
    for k in d:
        v = os.environ.get(k)
        if v:
            d[k] = v

MONITOR_MONGO_URL = 'mongodb://mongodb:27017/'
MONITOR_MONGO_DB_NAME = 'monitor'

FLASK_PORT = 5100
FLASK_HOST = '0.0.0.0'

DEBUG = True


# rabbitmq 配置
RABBITMQ_HOST = 'rabbitmq'
RABBITMQ_PORT_1 = 5672
RABBITMQ_USER = 'agent'
RABBITMQ_PASS = 'agent'
RABBITMQ_EXCHANGE = 'agent_data'
RABBITMQ_QUEUE = 'agent_data'
RABBITMQ_ROUT_KEY = 'data.agent'

# 数据接口地址
DATA_URL = 'http://agent_api:5100/api/v1'

__set_from_environ()
