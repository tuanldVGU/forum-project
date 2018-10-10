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
    mongodb: 'mongodb://admin:admin123@ds223253.mlab.com:23253/forum',
  },
  dev: {
    mongodb: 'mongodb://admin:admin123@ds223253.mlab.com:23253/forum',
  },
  prod: {
    mongodb: 'mongodb://admin:admin123@ds223253.mlab.com:23253/forum',
  },
};

module.exports = _.merge(defaultConfig, config[env]);
