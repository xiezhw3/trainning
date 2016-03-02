#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import collections
import pytest
import urllib

from flask import Flask

# from code.modules.queue import consumer

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


class BlockingConnection():
    def __init__(self, parameters):
        pass

    class Channel:
        class Queue(object):
            class Method(object):
                def __init__(self, queue):
                    self.queue = queue

            def __init__(self, queue):
                self.method = self.Method(queue)

        def __init__(self):
            self.messages = {}
            self.exchange = None
            self.callback = None

        def exchange_declare(self, exchange, type):
            self.exchange = exchange

        def queue_declare(self, exclusive=False):
            self.queue = self.Queue(self.exchange)
            return self.queue

        def basic_publish(self, exchange, routing_key,
                          body, properties):
            if routing_key not in self.messages:
                self.messages[routing_key] = []
            if (self.callback):
                self.callback(body)
            else:
                self.messages[routing_key].append(body)

        def basic_consume(self, callback, queue, no_ack=False):
            self.callback = callback

        def queue_bind(self, exchange, queue, routing_key):
            pass

        def start_consuming(self):
            pass

        def close(self):
            pass

    def channel(self):
        return self.Channel()

    def close(self):
        print 'rabbitmq producer close'


class Psutil:
    '''模拟 psutil 工具'''
    def __init__(self):
        self.times = 0

    class data_struct:
        def __init__(self, **kwds):
            self.__dict__ = kwds

    def cpu_times_percent(self, percpu):
        if percpu:
            return [self.data_struct(user=14353.92, nice=0.0,
                                     system=4939.04, idle=229518.36),
                    self.data_struct(user=14941.19, nice=0.0,
                                     system=5525.67, idle=252028.03)
                    ]
        else:
            return self.data_struct(user=14353.92, nice=0.0,
                                    system=4939.04, idle=229518.36)

    def virtual_memory(self):
        if self.times == 0:
            self.times += 1
            return self.data_struct(total=4144578560L,
                                    available=3128995840L,
                                    percent=24.5,
                                    used=2213453824L,
                                    free=1931124736L,
                                    active=1541189632,
                                    inactive=398012416,
                                    buffers=373547008L,
                                    cached=824324096)
        # 返回无效数据
        return self.data_struct(total=4144578560L,
                                available=3128995840L,
                                percent=24.5,
                                used=2213453824L,
                                free=1931124736L,
                                active=1541189632,
                                inactive=398012416,
                                cached=824324096)

    def swap_memory(self):
        return self.data_struct(total=0L,
                                used=0L,
                                free=0L,
                                percent=0.0,
                                sin=8414334976L,
                                sout=56000512L)

    def net_if_addrs(self):
        if self.times >= 1:
            return {
                'lo0': [
                    self.data_struct(family=2,
                                     address='127.0.0.1',
                                     netmask='255.0.0.0',
                                     broadcast=None,
                                     ptp=None),
                    self.data_struct(family=30,
                                     address=': : 1',
                                     netmask='255.0.0.0',
                                     broadcast=None,
                                     ptp=None),
                    self.data_struct(family=30,
                                     address='fe80: : 1%lo0',
                                     netmask='255.0.0.0',
                                     broadcast=None,
                                     ptp=None)
                ],
            }
        self.times += 1
        return {
                'eth0': [
                    self.data_struct(family=2,
                                     address='192.168.1.113',
                                     netmask='255.255.255.0',
                                     broadcast='192.168.1.255',
                                     ptp=None),
                    self.data_struct(family=18,
                                     address='192.168.1.113',
                                     netmask=None,
                                     broadcast=None,
                                     ptp=None),
                    self.data_struct(family=30,
                                     address='192.168.1.113',
                                     netmask=None,
                                     broadcast=None,
                                     ptp=None)
                ],
            }


@pytest.yield_fixture
def app(request):
    app = Flask(__name__)
    with app.test_request_context():
        app.debug = True
        app.testing = True
        yield app


def build_url(**kwargs):
    if not kwargs:
        return '/'
    params = {}
    for k, v in kwargs.iteritems():
        if v is None:
            continue
        params[k] = v
    return '/?' + urllib.urlencode(params)
