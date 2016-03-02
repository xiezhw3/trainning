#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import time

from code.utils import time_stand


def test_time_stand():
    now = time.time()
    assert time_stand(now) == now - time.altzone
    assert isinstance(time_stand(), float)
