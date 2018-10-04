const env = process.env.NODE_ENV || 'dev';
const _ = require('lodash');

const defaultConfig = {
  defaultUsers: [{
    username: 'admin',
    password: 'admin@123',
    email: 'admin@team1.com',
    userType: 'admin',
  }, {
    username: 'demo',
    password: 'demo',
    email: 'demo@team1.tech',
    userType: 'user',
  }],
};

const config = {
  test: {
    mongodb: 'mongodb://localhost:27017/forum-test',
    redis: {
      host: 'localhost',
      port: 6379,
      db: 0,
    },
    domain: 'http://localhost:8080',
  },
  dev: {
    mongodb: 'mongodb://localhost:27017/forum-dev',
    redis: {
      host: 'localhost',
      port: 6379,
      db: 0,
    },
    logDir: '/var/tmp/storage/logs',
    uploadDir: '/var/tmp/storage',
    exportDir: '/var/tmp/storage/image',
    tempDir: '/var/tmp/storage/temp',
    domain: 'http://localhost:8080',
  },
  prod: {
    mongodb: 'mongodb://mongod:27017/forum-prod',
    redis: {
      host: 'redis',
      port: 6379,
      db: 0,
    },
    domain: '',
  },
};

module.exports = _.merge(defaultConfig, config[env]);
