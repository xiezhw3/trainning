# 多机 Agent
本系统是一个多机环境下的监控系统，通过在每台机器上运行一个 agent，agent 定时收集机器的数据，然后将数据发送到一个统一的数据接收地址。并可以通过 web 前端进行监控数据的查看，机器监控信息对比等。

## 系统结构
系统分为如下几个部分：

* 数据存储：用 mongo 数据库进行存储
* 数据收集：在每台机器上有一个 aagent，定时进行机器数据的采集，并发送的数据接收地址
* api 接口：1. 接收 agent 的数据并放到 rabbitmq 队列。2. 为 web 端提供数据查询接口
* consumer：从 rabbirmq 队列拿数据，并做简单的处理后存储到数据库
* rabbitmq：数据提交和存储之间的缓存队列
* web 前端：进行监控数据的展示

## 文件树

    .
    ├── README.md
    ├── agent-server
    └── agent-ui

## 文件说明

    agent-server：agent 系统后台部分，包括监控系统和api服务
    agent-ui：web 前端部分

## 系统运行方式
在 agent-server 目录下运行如下命令：
```
$ TAG=1.0 && bash scripts/run.sh [build|start|stop]
```
这个启动文件会直接启动整个系统，如果需要直接控制某个子系统可以通过脚本 `docker-run.sh` 来进行。使用方式可以通过运行
```
$ bash scripts/docker-run.sh
```
来进行了解

在 docker-compsoe 文件里面我设置了 server1 和 server2 两个 agent，需要增加 agent 直接在 compose 文件增加即可。

## 查看方式
可以直接在浏览器通过如下链接进行访问：

```
url: [ip]:8080
```
其中 `ip` 是跑 web 容器的机器的 ip

## 说明
另外在 `scripts` 下也提供了模块启停脚本，可以通过它来启动相应的容器。但是需要注意容器间的启动顺序。
