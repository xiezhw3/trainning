#! /usr/bin/env python
# -*- coding: utf-8 -*-

'''
Author: xiezhw3@163.com
@contact: xiezhw3@163.com
@version: $Id$
Last modified: 2015-12-04
FileName: agent.py
Description: 单机 agent 数据采集模块，模块采用 psutil 进行
    系统数据的采集
'''

import os
import psutil

from code.utils import status


class Agent(object):
    '''单机数据采集 Agent

    主要完成对主机的 cpu 和 内存的监控，为了简单，采用 psutil进行
    实现
    '''

    def __init__(self):
        pass

    def cpu_percent(self, percpu=False):
        '''获取系统各部分的 cpu 时间百分比

        Args:
            percpu: 设置是否为每个逻辑 cpu 获取信息，Ture 表示为每个 cpu 单独
                获取监控信息。False 表示直接获取系统 cpu 时间

        Returns:
            ret_code: 操作是否成功地状态码
            cpu_percent: 如果 percpu 设置为 True，返回一个 list，里面每个元素
            是一个逻辑 cpu 的监控信息组成的字典，percpu 为 False 的时候直接返回
            一个字典。可通过键值对获得。
                user: 用户态
                nice: 低优先级用户态 (unix)
                system: 内核态
                idle: 空闲
                iowait: 等待 io (Linux)
                irp: 硬中断服务 (Linux, FreeBSD)
                softirp: 软中断服务 (Linux)
                steal: 虚拟化相关 (Linux 2.6.11+)
                guest: 虚拟化相关 (Linux 2.6.24+)
                guest_nice: 虚拟化相关 (Linux 3.2.0+)

        '''
        cpu_percent = psutil.cpu_times_percent(percpu=percpu)
        if percpu:
            for i in xrange(len(cpu_percent)):
                cpu_percent[i] = cpu_percent[i].__dict__
        else:
            cpu_percent = cpu_percent.__dict__
        return (status.OK, cpu_percent)

    def memory(self):
        '''获取系统内存使用信息

        Args:

        Returns:
            ret_code: 操作是否成功

            memory_info: 字典，系统内存使用情况，包括：
                total: 总内存
                used: 已使用内存
                abs_used: used - buffers - cached
                free: 空闲内存
                buffers: 磁盘缓冲
                cached: 磁盘缓存
                active: 活跃内存，不太可能被挪用
                inactive: 不活跃内存，很可能被挪用
                swap_used: 已使用 swap
        '''

        virtual_memory = psutil.virtual_memory().__dict__
        swap_memory = psutil.swap_memory().__dict__

        try:
            abs_used = virtual_memory['used'] - virtual_memory['buffers'] -\
                        virtual_memory['cached']

            memory_info = {
                'total': virtual_memory['total'],
                'used': virtual_memory['used'],
                'abs_used': abs_used,
                'free': virtual_memory['free'],
                'buffers': virtual_memory['buffers'],
                'cached': virtual_memory['cached'],
                'active': virtual_memory['active'],
                'inactive': virtual_memory['inactive'],
                'swap_used': swap_memory['used']
            }
        except KeyError as error:
            return (status.ERROR, 'KeyError: %s' % error)
        return (status.OK, memory_info)

    def load_average(self):
        '''获取系统的平均负载

        分别获取系统 1 / 5 / 15 min 中的平均负载

        Returns:
            ret_code: 操作状态码
            ret: 三种平均负载的键值对
        '''
        av1, av2, av3 = os.getloadavg()
        ret = {
            'w1_avg': av1,
            'w5_avg': av2,
            'w15_avg': av3
        }
        return (status.OK, ret)

    def ip_addr(self):
        '''获取机器本地 ip 地址

        分别获取系统 1 / 5 / 15 min 中的平均负载

        Returns:
            ret_code: 操作状态码
            ip: 机器 ip
        '''
        try:
            ip = psutil.net_if_addrs()['eth0'][0].__dict__['address']
        except Exception:
            return (status.ERROR, "Get local ip address error")
        return (status.OK, ip)
