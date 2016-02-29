#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import collections

DATA = collections.OrderedDict([
    ('records_valid', [
        {
            "load": {
                "status": 200,
                "load_info": {
                    "w15_avg": 0.05,
                    "w1_avg": 0,
                    "w5_avg": 0.01
                }
            },
            "ip": "172.17.0.5",
            "create_time": 1456385601.859391,
            "memory": {
                "status": 200,
                "memory_info": {
                    "swap_used": 0,
                    "used": 1488019456,
                    "cached": 946606080,
                    "free": 611926016,
                    "abs_used": 455499776,
                    "inactive": 661049344,
                    "active": 641101824,
                    "total": 2099945472,
                    "buffers": 85913600
                }
            },
            "cpu": {
                "status": 200,
                "cpu_info": {
                    "softirq": 0.3,
                    "iowait": 0.7,
                    "system": 5.8,
                    "guest": 0,
                    "idle": 84.8,
                    "user": 8.4,
                    "guest_nice": 0,
                    "irq": 0,
                    "steal": 0,
                    "nice": 0
                }
            }
        },
        {
            "load": {
                "status": 200,
                "load_info": {
                    "w15_avg": 0.05,
                    "w1_avg": 0,
                    "w5_avg": 0.01
                }
            },
            "ip": "172.17.0.6",
            "create_time": 1456385601.859391,
            "memory": {
                "status": 200,
                "memory_info": {
                    "swap_used": 0,
                    "used": 1488019456,
                    "cached": 946606080,
                    "free": 611926016,
                    "abs_used": 455499776,
                    "inactive": 661049344,
                    "active": 641101824,
                    "total": 2099945472,
                    "buffers": 85913600
                }
            },
            "cpu": {
                "status": 200,
                "cpu_info": {
                    "softirq": 0.3,
                    "iowait": 0.7,
                    "system": 5.8,
                    "guest": 0,
                    "idle": 84.8,
                    "user": 8.4,
                    "guest_nice": 0,
                    "irq": 0,
                    "steal": 0,
                    "nice": 0
                }
            }
        },
        {
            "load": {
                "status": 200,
                "load_info": {
                    "w15_avg": 0.05,
                    "w1_avg": 0,
                    "w5_avg": 0.01
                }
            },
            "ip": "172.17.0.6",
            "memory": {
                "status": 200,
                "memory_info": {
                    "swap_used": 0,
                    "used": 1488019456,
                    "cached": 946606080,
                    "free": 611926016,
                    "abs_used": 455499776,
                    "inactive": 661049344,
                    "active": 641101824,
                    "total": 2099945472,
                    "buffers": 85913600
                }
            },
            "cpu": {
                "status": 200,
                "cpu_info": {
                    "softirq": 0.3,
                    "iowait": 0.7,
                    "system": 5.8,
                    "guest": 0,
                    "idle": 84.8,
                    "user": 8.4,
                    "guest_nice": 0,
                    "irq": 0,
                    "steal": 0,
                    "nice": 0
                }
            }
        }
    ]),
    ('records_unvalid', [
        {
            "load": {
                "status": 200,
                "load_info": {
                    "w15_avg": 0.05,
                    "w1_avg": 0,
                    "w5_avg": 0.01
                }
            },
            "create_time": 1456385601.859391,
            "memory": {
                "status": 200,
                "memory_info": {
                    "swap_used": 0,
                    "used": 1488019456,
                    "cached": 946606080,
                    "free": 611926016,
                    "abs_used": 455499776,
                    "inactive": 661049344,
                    "active": 641101824,
                    "total": 2099945472,
                    "buffers": 85913600
                }
            },
            "cpu": {
                "status": 200,
                "cpu_info": {
                    "softirq": 0.3,
                    "iowait": 0.7,
                    "system": 5.8,
                    "guest": 0,
                    "idle": 84.8,
                    "user": 8.4,
                    "guest_nice": 0,
                    "irq": 0,
                    "steal": 0,
                    "nice": 0
                }
            }
        },
        "unvalid data",
    ]),
])

class KafkaClient:
    '''Mock kafka 客户端'''

    def __init__(self):
        self.messages = []

class SimpleProducer:
    '''模拟 kafka 生产者'''
    def __init__(self, client):
        self.client = client

    def send_message(self, msg):
        '''模拟 kafka 插入数据'''
        self.client.messages.append(msg)

class SimlpeConsumer:
    '''模拟 kafka 消费者'''
    def __init__(self, client):
        self.client = client

    def get_message(self):
        '''模拟 kafka 消费消息'''
        msg_len = len(self.client.messages)
        if msg_len == 0:
            return
        ret = self.client.messages[0]
        self.client.messages = self.client.messages[1:]
        return ret
