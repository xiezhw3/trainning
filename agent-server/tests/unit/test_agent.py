#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import pytest

from code.modules.single_agent import agent as agent_m
from code.utils import status

from conftest import Psutil


@pytest.fixture(scope="function")
def agent(monkeypatch):
    psutil = Psutil()
    monkeypatch.setattr(agent_m, 'psutil', psutil)
    return agent_m.Agent()


class TestAgent:

    def test_cpu_percent(self, agent):
        '''测试 agent 拿到的 cpu 时间百分数，分别测试返回状态，返回数据类型
        和返回数据结构
        '''
        cpu_times = agent.cpu_percent()
        assert cpu_times[0] == status.OK
        assert isinstance(cpu_times[1], dict)
        assert 'user' in cpu_times[1] and 'system' in cpu_times[1]

        cpu_times = agent.cpu_percent(percpu=True)
        assert cpu_times[0] == status.OK
        assert isinstance(cpu_times[1], list)
        assert len(cpu_times[1]) == 2

    def test_memory(self, agent):
        '''测试拿到的内存数据，这里模拟拿到的 cpu 数据出错的情况'''
        assert agent.memory()[0] == status.OK
        assert agent.memory()[0] == status.ERROR

    def test_load_average(self, agent):
        assert agent.load_average()[0] == status.OK
        assert len(agent.load_average()[1].keys()) == 3

    def test_ip_addr(self, agent):
        ip = agent.ip_addr()
        assert ip[0] == status.OK
        assert len(ip[1].split('.')) == 4
        assert agent.ip_addr()[0] == status.ERROR
