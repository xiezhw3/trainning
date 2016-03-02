#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import pytest

from code.modules.queue import producer as producer_m
from code.utils import status

from conftest import BlockingConnection


@pytest.fixture(scope="function")
def producer(monkeypatch):
    monkeypatch.setattr(producer_m.pika, 'BlockingConnection',
                        BlockingConnection)
    producer = producer_m.Producer()
    return producer


class TestStore:
    '''测试 rabbbitmq 消费者模块'''
    def test_produce(self, producer):
        assert producer.produce({'msg': 'hello world'})[0] == status.OK
        assert producer.produce('hello world')[0] == status.OK

    def test_stop(self, producer):
        producer.stop()
