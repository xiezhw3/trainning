#! /usr/bin/env python
# -*- coding: utf-8 -*-

'''
Author: xiezhw3@163.com
@contact: xiezhw3@163.com
@version: $Id$
Last modified: 2015-12-05
FileName: agent_api.py
Description: 单机 agent 的监控数据查看 restful api
'''

from flask import request
from flask.ext import restful
from flask import Blueprint

import json
import httplib

from code.utils import time_stand
from code.utils.json_encoder import JSONEncoder
from code.modules.queue.producer import Producer
from code.modules.db_processor.db_processor import DbProcessor


class Agent(restful.Resource):
    '''Agent api'''
    def __init__(self):
        restful.Resource.__init__(self)
        self.db_processor = DbProcessor()
        self.queue_producer = Producer()

    def get(self):
        '''根据时间段获取数据'''
        from_time = time_stand(float(request.args.get('from_time', 0)))
        to_time = time_stand(float(request.args.get('to_time', 0)))
        ips = request.values.getlist('ips')

        machineData = {"data": {}}
        if not ips:
            (ret_status, r_ips) = self.db_processor.get_ip_list()
            machineData['ips'] = [ip['ip'] for ip in r_ips]
            ips = [machineData['ips'][0]]
        for ip in ips:
            (ret_status, ret) = self.db_processor.get_ele_by_time_interval(
                                                                  from_time,
                                                                  to_time,
                                                                  ip)
            if ret_status == httplib.OK:
                machineData['data'][ip] = ret
        return json.loads(JSONEncoder().encode(machineData)), httplib.OK

    def post(self):
        data = request.data
        if not isinstance(data, str):
            data = str(data)
        (ret_status, ret) = self.queue_producer.produce(data)
        return ret, ret_status

blueprint = Blueprint(__name__ + 'api', __name__)
api = restful.Api(blueprint)
api.add_resource(Agent,
                 '',
                 endpoint='agent')
