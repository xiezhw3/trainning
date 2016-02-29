#! /usr/bin/env python
# -*- coding: utf-8 -*-

'''
Author: gzxiezhiwang@corp.netease.com
@contact: gzxiezhiwang@corp.netease.com
@version: $Id$
Last modified: 2015-11-11
FileName: url_requests.py
Description: 根据 url 以及参数访问对应 url 并返回访问结果
'''
import requests
import httplib
import traceback
import json
import logging
from pprint import pformat
from colorama import Fore, Back, Style

def common_proxy(method, url, expected=None, headers=None, **kwargs):
    f = getattr(requests, method)
    r = f(url, headers=headers, verify=False, **kwargs)
    code = r.status_code
    if expected and code in expected:
        return expected[code]
    print r.text
    if code >= httplib.OK and code <= httplib.NON_AUTHORITATIVE_INFORMATION:
        try:
            resp = json.loads(r.text)
        except ValueError, ex:
            raise Exception('request error: %d\n%s\n%s' % (r.status_code, str(ex), r.text))
        return resp
    elif code == httplib.NO_CONTENT:
        return
    else:
        logging.error('request error: %d\n%s' % (r.status_code, r.text))
        resp = None
        text = ''
        if code == httplib.INTERNAL_SERVER_ERROR:
            text = r.text
        else:
            try:
                resp = json.loads(r.text)
                text = pformat(resp)
            except ValueError, ex:
                raise RestException(r.status_code, resp, text, ex)
        raise RestException(r.status_code, resp, text)

class RestException(Exception):
    def __init__(self, code, resp, text, ex=None):
        self.code = code
        self.resp = resp
        self.text = text
        self.ex = ex

    def __str__(self):
        return Fore.RED + 'REQUEST ERROR: ' + Fore.RESET \
            + Back.CYAN + str(self.code) \
            + "\n" + Back.BLUE + self.text \
            + (("\n" + Back.YELLOW + str(self.ex)) if self.ex else "") \
            + Fore.RESET + Back.RESET + Style.RESET_ALL
