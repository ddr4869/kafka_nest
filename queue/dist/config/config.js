"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGPATH = exports.LOGLEVEL = exports.REDISPWD = exports.REDISUSER = exports.REDISPORT = exports.REDISHOST = exports.DBPWD = exports.DBUSER = exports.DBNAME = exports.DBPORT = exports.DBHOST = void 0;
require('dotenv').config();
const env = require("env-var");
exports.DBHOST = env
    .get('DB_HOST')
    .default('127.0.0.1')
    .asString();
exports.DBPORT = env
    .get('DB_PORT')
    .default('5432')
    .asPortNumber();
exports.DBNAME = env
    .get('DB_NAME')
    .default('test')
    .asString();
exports.DBUSER = env
    .get('DB_USER')
    .default('postgres')
    .asString();
exports.DBPWD = env
    .get('DB_PASS')
    .default('postgres')
    .asString();
exports.REDISHOST = env
    .get('REDIS_HOST')
    .default('127.0.0.1')
    .asString();
exports.REDISPORT = env
    .get('REDIS_PORT')
    .default('6379')
    .asPortNumber();
exports.REDISUSER = env
    .get('REDIS_USERNAME')
    .default('')
    .asString();
exports.REDISPWD = env
    .get('REDIS_PASSWORD')
    .default('redispw')
    .asString();
exports.LOGLEVEL = env
    .get('LOG_LEVEL')
    .default('info')
    .asEnum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']);
exports.LOGPATH = env
    .get('LOG_PATH')
    .default('./logs')
    .asString();
//# sourceMappingURL=config.js.map