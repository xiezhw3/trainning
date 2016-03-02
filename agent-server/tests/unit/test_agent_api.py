#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import time
import httplib
import pytest

from code.api import agent_api
from code.utils import status

from conftest import DATA
from conftest import build_url


class DbProcessor:
    def get_ele_by_time_interval(self, from_time, to_time, ip):
        return (status.OK, [record for record in DATA['records_valid']
                            if record['ip'] == ip])

    def get_ip_list(self):
        return (status.OK, [
            {'ip': record['ip']} for record in DATA['records_valid']])


class Producer:
    def produce(self, data):
        return (status.OK, 'Message send successfully.')


@pytest.fixture(scope="function")
def agentapi(monkeypatch):
    monkeypatch.setattr(agent_api, "DbProcessor", DbProcessor)
    monkeypatch.setattr(agent_api, "Producer", Producer)

    return agent_api.Agent()


class TestAgent:
    '''测试 Agent api 部分'''
    def test_get(self, app, agentapi):
        url = build_url(from_time=time.time() - 1000,
                        to_time=time.time(),
                        ip=DATA['records_valid'][0]['ip'])
        with app.test_request_context(url):
            data, status_code = agentapi.get()
            assert status_code == httplib.OK
            assert isinstance(data, dict)
            assert len(data['data']) == 1

    def test_post(self, app, agentapi):
        agent_api.request.data = DATA['records_valid'][0]
        ret, status_code = agentapi.post()
        assert status_code == status.OK
        assert ret == 'Message send successfully.'
