#! /usr/bin/env python
# coding: utf-8

'''
Author: xiezhw3@163.com
@contact: xiezhw3@163.com
@version: $Id$
Last modified: 2015-12-25
FileName: json_encoder.py
Description: 针对 mongodb 的 ObjectID 进行特殊处理
'''

import json


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        return str(o)
