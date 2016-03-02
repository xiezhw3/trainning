#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import datetime
import json
from bson import ObjectId

from code.utils import json_encoder


def test_json_encoder():
    json_e = json_encoder.JSONEncoder()
    now = datetime.datetime.now()
    data = {
        'time': ObjectId.from_datetime(generation_time=now)
    }
    data = json_e.encode(data)
    assert isinstance(data, str) and \
        isinstance(json.loads(data)['time'], unicode)
    data2 = {
        'time': str(now)
    }
    assert isinstance(json_e.encode(data2), str)
