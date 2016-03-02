#! /usr/bin/env python
# coding: utf-8


'''
Author: xiezhw3@163.com
@contact: xiezhw3@163.com
@version: $Id$
Last modified: 2016-01-17
FileName: producer.py
Description: 将消息插入到 rabbitmq 队列
'''

import pika
import json

from conf import config
from code.utils import status


class Producer(object):
    '''队列消息生产者'''
    def __init__(self):
        credentials = pika.PlainCredentials(config.RABBITMQ_USER,
                                            config.RABBITMQ_PASS)
        parameters = pika.ConnectionParameters(config.RABBITMQ_HOST,
                                               config.RABBITMQ_PORT_1,
                                               '/', credentials)
        self.connection = pika.BlockingConnection(parameters)
        self.channel = self.connection.channel()

        self.channel.exchange_declare(exchange=config.RABBITMQ_EXCHANGE,
                                      type='topic')

    def produce(self, message):
        '''将消息插入到队列'''
        if isinstance(message, dict):
            message = json.dumps(message)

        self.channel.basic_publish(exchange=config.RABBITMQ_EXCHANGE,
                                   routing_key=config.RABBITMQ_ROUT_KEY,
                                   body=message,
                                   properties=pika.BasicProperties(
                                       delivery_mode=2,
                                   ))
        return (status.OK, 'Message send successfully.')

    def stop(self):
        self.connection.close()
