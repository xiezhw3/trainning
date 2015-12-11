#! /usr/bin/env python
# -*- coding: utf-8 -*-

# Author: xiezhw3@163.com
# @contact: xiezhw3@163.com
# @version: $Id$
# Last modified: 2015-12-05
# FileName: agent.py
# Description: 监控 agent 启动模块

"""Example of program with many options using docopt.
Usage:
  code server [-t TTL] [-m MODULE]
  code api

Options:
    -h, --help            show this help message and exit
    -v, --version            show version and exit
    -t, --ttl         print status messages
    --module      use MODULE

Modules:
    all, cpu, memory
"""

import logging
import sys
from docopt import docopt

def server(ttl=None, modules=None, percpu=False):
    '''启动监控器'''
    from code.modules.single_agent.monitor import Monitor
    monitor = Monitor(ttl, percpu, modules)
    monitor.start()

def api():
    '''启动 API 服务'''
    from code.api import agent_api
    agent_api.run_app()

if __name__ == '__main__':
    arguments = docopt(__doc__, version='1.0.0')
    
    if sys.argv[1] == 'server':
        if arguments['TTL']:
            arguments['TTL'] = int(arguments['TTL'])
        server(arguments['TTL'], arguments['MODULE'])
    else:
        api()
