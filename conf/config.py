import os

def env_default(k, default):
    v = os.environ.get(k, default)
    globals()[k] = v

MONITOR_MONGO_URL = 'mongodb://mongodb:27017/'
MONITOR_MONGO_DB_NAME = 'monitor'
MONITOR_MONGO_COLLECTION = 'mointordata'

API_URL = '0.0.0.0'
