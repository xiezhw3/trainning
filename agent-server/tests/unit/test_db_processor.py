#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import pytest
import mongomock

from code.utils import status
from code.modules.db_processor import db_processor

from conftest import DATA


@pytest.fixture(scope="function")
def db(monkeypatch):
    db = mongomock.MongoClient().db
    monkeypatch.setattr(db_processor, 'db', db)
    return db_processor.DbProcessor()


class TestDbProcessor:
    def test_insert(self, db):
        '''测试数据库插入'''
        for data in DATA['records_valid']:
            assert db.insert(data)[0] == status.OK

        for data in DATA['records_unvalid']:
            assert db.insert(data)[0] == status.ERROR

    def test_insert_ip(self, db):
        '''测试获取 ip 列表'''
        for data in DATA['records_valid']:
            assert db._insert_ip(data) == status.OK

        for data in DATA['records_unvalid']:
            assert db._insert_ip(data) == status.ERROR


    def test_get_ip_list(self, db):
        '''测试数据库的'''
        for data in DATA['records_valid']:
            db.insert(data)[0]
        ip_list = [data['ip'] for data in DATA['records_valid']]
        db_ip_list = [data['ip'] for data in db.get_ip_list()[1]]
        assert set(ip_list) == set(db_ip_list)

    def test_get_ele_by_time_interval(self, db):
        '''测试数据查询'''
        import time
        for data in DATA['records_valid']:
            db.insert(data)

        db_status = db.get_ele_by_time_interval()[0]
        assert db_status == status.ERROR

        db_status = db.get_ele_by_time_interval("start", "end")[0]
        assert db_status == status.ERROR

        db_data = db.get_ele_by_time_interval(time.time(), time.time())[1]
        assert len(db_data) == 0

        db_data = db.get_ele_by_time_interval(1456385001.859391, time.time())[1]
        assert len(db_data) == 1

    def test_get_random_ip(self, db):
        '''测试随机获取 ip'''
        for data in DATA['records_valid']:
            db.insert(data)
        ip_list = [data['ip'] for data in DATA['records_valid']]
        assert db._get_random_ip()['ip'] in ip_list
