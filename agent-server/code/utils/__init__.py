#!/usr/bin/env python
# -*- coding: utf-8 -*-

import time


def time_stand(ts):
    '''时区处理'''
    if not ts:
        ts = time.time()
    return ts - time.altzone
