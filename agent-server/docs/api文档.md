# Agent api 文档
[TOC]
## 概述
Agent 是一个服务器状态监控系统，包括数据采集和数据展示两个部分。系统提供了数据提交，数据获取接口。

* 各个机器的监控 agent 可以通过接口进行监控信息的提交
* web 页面通过接口获取监控信息

## 环境说明

* 访问地址：[ip]:5100/api/v1

## API
### 基本说明
当前的 URL 统一以 `api/v1` 为前缀

### 添加一条监控数据
```
POST /
```

* 示例

```
data = {
    "load": {
        "status": 200,
        "load_info": {
            "w15_avg": 0.44,
            ...
        }
    },
    "ip": "172.17.0.5",
    "create_time": 1456724860.171553,
    "cpu": {
        "status": 200,
        "cpu_info": {
            "user": 7.9,
            ...
        }
    },
    "memory": {
        "status": 200,
        "memory_info": {
            "abs_used": 371580928,
            ...
        }
    }
}

post("/", json=data)
```

### 获取一条监控数据

* 在获取监控数据的时候可以按需要选择是否提供机器 ip，ip可以是多个。当不提供 ip 时，将随机选择一个已有 ip 然后返回该 ip 对应的机器的监控数据。

* 在获取数据的时候需要提供监控数据起止时间。


```
GET /
```

* 示例

```
data = {
    "from_time": from_time,
    "to_time": to_time,
    "ips": [...]
}

get("/", json=data)
```

返回的数据格式为 json，示例：

```
{
    u'ips': [
        u'172.17.0.5',
        u'172.17.0.7'
    ],
    u'data': {
        u'172.17.0.5': [
            {
                u'load': {
                    u'status': 200,
                    u'load_info': {
                        u'w15_avg': 0.36,
                        ...
                    }
                },
                u'ip': u'172.17.0.5',
                u'create_time': 1456725114.970607,
                u'memory': {
                    u'status': 200,
                    u'memory_info': {
                        u'swap_used': 0,
                        ...
                    }
                },
                u'_id': u'56d3dc7b7b9ffa00014ee69e',
                u'cpu': {
                    u'status': 200,
                    u'cpu_info': {
                        u'softirq': 0.0,
                        ...
                    }
                }
            },
        ]
    }
}
```
