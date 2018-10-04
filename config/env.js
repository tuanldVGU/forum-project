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
    email: 'demo@team1.com',
    userType: 'user',
  }],
};

const config = {
  test: {
    mongodb: 'mongodb://localhost:27017/forum-test',
    domain: 'http://localhost:8080',
  },
  dev: {
    mongodb: 'mongodb://localhost:27017/forum-dev',
    domain: 'http://localhost:8080',
  },
  prod: {
    mongodb: 'mongodb://mongod:27017/forum-prod',
    domain: '',
  },
};

module.exports = _.merge(defaultConfig, config[env]);
