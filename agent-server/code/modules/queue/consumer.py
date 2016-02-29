#! /usr/bin/env python
# coding: utf-8

'''
Author: xiezhw3@163.com
@contact: xiezhw3@163.com
@version: $Id$
Last modified: 2016-01-17
FileName: consumer.py
Description: 从 rabbitmq 拿到消息并存储到数据库
'''

import pika
import json
import logging
import pymongo
import traceback

from conf import config
from code.modules.db_processor.db_processor import DbProcessor

MAX_TRY_TIME = 5


class Consumer(object):
    '''队列消息消费者'''
    def __init__(self):
        self.db_processor = DbProcessor()
        credentials = pika.PlainCredentials(config.RABBITMQ_USER,
                                            config.RABBITMQ_PASS)
        parameters = pika.ConnectionParameters(config.RABBITMQ_HOST,
                                               config.RABBITMQ_PORT_1,
                                               '/', credentials)
        connection = pika.BlockingConnection(parameters)
        self.channel = connection.channel()
        self.channel.exchange_declare(exchange=config.RABBITMQ_EXCHANGE,
                                      type='topic')

        result = self.channel.queue_declare(exclusive=True)
        self.queue_name = result.method.queue
        self.channel.queue_bind(exchange=config.RABBITMQ_EXCHANGE,
                                queue=self.queue_name,
                                routing_key=config.RABBITMQ_ROUT_KEY)

    def callback(self, ch, method, properties, body):
        if isinstance(body, str):
            body = json.loads(body)
        try_time = 0
        while try_time < MAX_TRY_TIME:
            try_time += 1
            try:
                self.db_processor.insert(body)
                break
            except pymongo.errors.ServerSelectionTimeoutError as error:
                logging.error("Insert record timeout: [%s], [%s], [%s]" %
                              (error.__class__.__name__,
                               error,
                               traceback.format_exc()))
            except Exception as error:
                logging.error("Insert record error: [%s], [%s], [%s]" %
                              (error.__class__.__name__,
                               error,
                               traceback.format_exc()))

    def start(self):
        self.channel.basic_consume(self.callback,
                                   queue=self.queue_name,
                                   no_ack=True)
        self.channel.start_consuming()

    def stop(self):
        self.channel.close()
