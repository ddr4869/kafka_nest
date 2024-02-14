require('dotenv').config();
import * as env from 'env-var';

export const DBHOST = env
    .get('DB_HOST')
    .default('127.0.0.1')
    .asString();    

export const DBPORT = env
    .get('DB_PORT')
    .default('5432')
    .asPortNumber();

export const DBNAME = env
    .get('DB_NAME')
    .default('test')
    .asString();

export const DBUSER = env
    .get('DB_USER')
    .default('postgres')
    .asString();

export const DBPWD = env
    .get('DB_PASS')
    .default('postgres')
    .asString();


// set redis port to start the REST server on
export const REDISHOST = env
    .get('REDIS_HOST')
    .default('127.0.0.1')
    .asString();

// set redis port to start the REST server on
export const REDISPORT = env
    .get('REDIS_PORT')
    .default('6379')
    .asPortNumber();

// set redis username to start the REST server on
export const REDISUSER = env
    .get('REDIS_USERNAME')
    .default('')
    .asString();

// set redis password to start the REST server on
export const REDISPWD = env
    .get('REDIS_PASSWORD')
    .default('redispw')
    .asString();

// set log level for the REST server (winston level..)
export const LOGLEVEL = env
    .get('LOG_LEVEL')
    .default('info')
    .asEnum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']);

// set log file path for the REST server (winston)
export const LOGPATH = env
    .get('LOG_PATH')
    .default('./logs')
    .asString();



