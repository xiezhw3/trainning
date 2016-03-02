#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import pytest
import json
import requests

from code.modules.single_agent import monitor as monitor_m
from code.modules.single_agent import agent
from code.utils import status


@pytest.fixture(scope="function")
def monitor():
    return monitor_m.Monitor()


class TestMonitor:
    '''模块 monitor.py 的单测'''
    def common_proxy(self, method, url, **kwargs):
        resp = requests.Response
        resp.status_code = 200
        resp.text = json.dumps((
            status.OK,
            "Message send successfully"))
        return resp

    def test_monitor(self, monitor):
        ret = monitor._monitor()
        assert set(ret.keys()) == set(['cpu', 'memory', 'load', 'ip'])

    def test_init(self):
        monitor1 = monitor_m.Monitor(100, True, 'all')
        assert monitor1.period == 100 and \
            monitor1.percpu is True and \
            monitor1.module == 'all' and \
            isinstance(monitor1.agent, agent.Agent)

    def test_process(self, monkeypatch, monitor):
        monkeypatch.setattr(monitor_m, 'common_proxy', self.common_proxy)
        monitor._process()

    def test_store(self, monkeypatch, monitor):
        monkeypatch.setattr(monitor_m, 'common_proxy', self.common_proxy)
        monitor._store({"cpu": "cpu_data"})

    class StopSchedulrError(RuntimeError):
        def __init__(self, arg):
            self.args = arg

    class schedule:
        def __init__(self):
            self.seconds = self

        def every(self, period=1):
            return self

        def do(self, job):
            pass

        def run_pending(self):
            raise TestMonitor.StopSchedulrError('Use to stop schedule')

    def test_start(self, monkeypatch, monitor):
        def sleep(seconds):
            assert isinstance(seconds, int)
            raise self.StopSchedulrError('Use to stop while loop')

        monkeypatch.setattr(monitor_m.time, 'sleep', sleep)
        try:
            monitor.start()
        except self.StopSchedulrError:
            pass

        monkeypatch.setattr(monitor_m, 'schedule', self.schedule())
        try:
            monitor.start()
        except self.StopSchedulrError:
            pass
