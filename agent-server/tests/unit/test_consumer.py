#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import pytest
import pymongo

from code.modules.queue import consumer as consumer_m

from conftest import BlockingConnection


class DbProcessor:
    def __init__(self):
        self.records = []

    def insert(self, record):
        self.records.append(record)


class DbProcessorServerSelectionTimeoutError:
    def __init__(self):
        self.records = []

    def insert(self, record):
        raise pymongo.errors.ServerSelectionTimeoutError


class DbProcessorException:
    def __init__(self):
        self.records = []

    def insert(self, record):
        raise Exception


@pytest.fixture(scope="function")
def consumer(monkeypatch):
    monkeypatch.setattr(consumer_m.pika, 'BlockingConnection',
                        BlockingConnection)
    consumer = consumer_m.Consumer()
    return consumer


class TestConsumer:
    '''测试 rabbitmq 消息消费者'''
    def test_callback(self, consumer, monkeypatch):
        # normal
        monkeypatch.setattr(consumer, 'db_processor', DbProcessor())
        consumer.callback(None, None, None, {'msg': 'hello world'})
        consumer.callback(None, None, None, '{"msg": "hello world"}')

        # ServerSelectionTimeoutError
        monkeypatch.setattr(consumer, 'db_processor',
                            DbProcessorServerSelectionTimeoutError())
        consumer.callback(None, None, None, {'msg': 'hello world'})

        # Exception
        monkeypatch.setattr(consumer, 'db_processor',
                            DbProcessorException())
        consumer.callback(None, None, None, {'msg': 'hello world'})

    def test_start(self, consumer, monkeypatch):
        def callback(ch, method, properties, body):
            assert isinstance(body, dict)

        monkeypatch.setattr(consumer_m.Consumer, 'callback', callback)
        consumer.start()

    def test_stop(self, consumer):
        consumer.stop()
