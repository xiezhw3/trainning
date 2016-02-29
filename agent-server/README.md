## 单机监控系统
这个系统是一个对主机 cpu 和 内存进行监控的单机监控系统，目前包括两种运行方式，直接在物理机运行和使用 docker 容器运行。目前已经完成 docker compose 文件，可以直接通过 docker compose 来运行容器。

### 文件目录

    .
    ├── Dockerfile
    ├── README.md
    ├── code
    │   ├── __init__.py
    │   ├── __main__.py
    │   ├── api
    │   │   ├── __init__.py
    │   │   └── agent_api.py
    │   ├── modules
    │   │   ├── __init__.py
    │   │   ├── db_processor
    │   │   │   ├── __init__.py
    │   │   │   └── db_processor.py
    │   │   ├── queue
    │   │   │   ├── __init__.py
    │   │   │   ├── consumer.py
    │   │   │   └── producer.py
    │   │   └── single_agent
    │   │       ├── __init__.py
    │   │       ├── agent.py
    │   │       └── monitor.py
    │   └── utils
    │       ├── __init__.py
    │       ├── json_encoder.py
    │       ├── status.py
    │       └── url_requests.py
    ├── conf
    │   ├── __init__.py
    │   └── config.py
    ├── docs
    │   ├── README.md
    │   ├── 第0阶段_预备知识总结.md
    │   ├── 第1阶段_单机agent.md
    │   ├── 第2阶段_单机agent_web.md
    │   └── 第3阶段_多机agent.md
    ├── misc
    │   ├── compose
    │   │   ├── docker-compose.dev.yml
    │   │   └── docker-compose.yml
    │   ├── pip.conf
    │   ├── requirements.txt
    │   ├── sources.list
    ├── scripts
    │   ├── docker-run.sh
    │   ├── run.sh
    │   └── run_tests.sh
    └── tests
        ├── run.py
        ├── test.sh

## 运行
### 物理机运行
项目分为两个部分，一个是 agent 部分，主要是进行机器监控，并将监控数据发送到 api，由 api 统一将数据推到消息队列。然后会有一个 consumer 将消息插入到数据库。

项目另一部分是 api，api 包括两类接口，`post` 和 `get`，分别是数据提交和查询的接口。具体可以通过 `docs` 文件夹下的 api 文档进行了解。

#### 运行依赖
运行依赖已经写好在项目的  `misc/requirements.txt` 文件中，可以通过
```
$ pip -r misc/requirements.txt
```
进行安装

#### 运行方式

* server
```
# 可以通过运行 python -m code -h 获取运行提示
$ python -m code server [-t ttl] [-m MODULE]
```

* api
```
$ python -m code api
```

### docker 容器运行
因为我打包的镜像没办法传到公司镜像仓库，所以在运行代码的时候需要自己打包一次镜像。我在项目中提供了一份脚本进行镜像的打包。可以直接通过运行脚本运行整个项目。

#### 环境准备
因为 Docker 的安装资源文件放在 Amazon S3，国内下载间歇性连接失败，因此后面的 docker 安装，镜像下载等都会基于 Daocloud 的镜像仓库

下面默认 linux 下安装，osx 和 windows 需要安装 toolbox

* 安装 docker
```
$ curl -sSL https://get.daocloud.io/docker | sh
``` 
* 安装 docker-compose
```
$ curl -L https://get.daocloud.io/docker/compose/releases/download/1.5.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
$ chmod +x /usr/local/bin/docker-compose
# 你可以通过修改URL中的版本，可以自定义您的需要的版本。
```

#### 运行方式
在 agent-server 目录下运行如下命令：
```
$ TAG=1.0 && bash scripts/run.sh [build|start|stop]
```
这个启动文件会直接启动整个系统，如果需要直接控制某个子系统可以通过脚本 `docker-run.sh` 来进行。使用方式可以通过运行
```
$ bash scripts/docker-run.sh
```
来进行了解

### Contact

e-mail: xiezhw3@163.com
