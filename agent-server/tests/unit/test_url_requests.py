#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import requests
import httplib
import json

from code.utils import url_requests


class Requests:
    def __init__(self):
        self.visic_time = 0

    def post(self, *args, **kwargs):
        self.visic_time += 1
        resp = requests.Response
        if self.visic_time < 3:
            resp.status_code = httplib.OK
            resp.text = json.dumps({"status": "successfuly"})
        elif self.visic_time == 3:
            # return will cause ValueError
            resp.status_code = httplib.OK
            resp.text = "value err"
        elif self.visic_time == 4:
            resp.status_code = httplib.NO_CONTENT
        elif self.visic_time == 5:
            # server error
            resp.status_code = httplib.INTERNAL_SERVER_ERROR
            resp.text = json.dumps({"status": "server error"})
        elif self.visic_time == 6:
            # server error
            # will cause ValueError
            resp.status_code = httplib.BAD_REQUEST
            resp.text = "bad request"
        elif self.visic_time == 7:
            # server error
            resp.status_code = httplib.BAD_REQUEST
            resp.text = json.dumps({"status": "bad request"})

        return resp


class TestUrlReqtests:
    def test_common_proxy(self, monkeypatch):
        monkeypatch.setattr(url_requests, "requests", Requests())
        expected = {
            httplib.OK: httplib.OK,
        }
        # OK
        assert url_requests.common_proxy('post', 'localhost', expected) == \
            httplib.OK
        # OK
        assert url_requests.common_proxy('post', 'localhost') == \
            {"status": "successfuly"}

        # ValueError
        try:
            url_requests.common_proxy('post', 'localhost')
        except Exception as error:
            assert error.message == \
                'request error: 200\nNo JSON object could be decoded\nvalue err'

        # NO_CONTENT
        url_requests.common_proxy('post', 'localhost') is None

        # INTERNAL_SERVER_ERROR
        try:
            url_requests.common_proxy('post', 'localhost')
        except url_requests.RestException as exception:
            assert exception.code == httplib.INTERNAL_SERVER_ERROR

        # BAD_REQUEST
        # valur error
        try:
            url_requests.common_proxy('post', 'localhost')
        except url_requests.RestException as exception:
            assert exception.code == httplib.BAD_REQUEST

        # BAD_REQUEST
        try:
            url_requests.common_proxy('post', 'localhost')
        except url_requests.RestException as exception:
            assert exception.code == httplib.BAD_REQUEST
            assert exception.text == "{u'status': u'bad request'}"


class TestRestException:
    def test_str(self):
        from colorama import Fore, Back, Style

        resp = requests.Response
        resp.status_code = httplib.OK
        resp.text = json.dumps({"status": "successfuly"})
        ex = url_requests.RestException(httplib.OK, resp,
                                        "{u'status': u'successfuly'}")
        str(ex) == Fore.RED + 'REQUEST ERROR: ' + Fore.RESET \
            + Back.CYAN + str(resp.status_code) \
            + "\n" + Back.BLUE + resp.text \
            + (("\n" + Back.YELLOW + str(None))
               if None else "") \
            + Fore.RESET + Back.RESET + Style.RESET_ALL
