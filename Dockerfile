FROM debian:7.8

# basic
COPY ./misc/sources.list /etc/apt/sources.list
RUN apt-get update

# deps
ADD ./misc/requirements.txt /
RUN apt-get -y install python-pip python-dev
ADD ./misc/pip.conf /root/.pip/pip.conf
RUN pip install -r requirements.txt

ADD ./code /code

VOLUME /conf
ADD ./conf /conf
ADD ./scripts/run.sh  /run.sh

WORKDIR /
EXPOSE 5000
CMD ["python", "-m", "code", "server"]
