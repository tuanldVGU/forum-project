const _ = require('lodash');
const mongoose = require('mongoose');

const user = mongoose.model('user');

const { ObjectId } = mongoose.Types;
class userService {
  static getDetail(userId) {
    return user.find(userId).exec();
  }
}
module.exports = userService;
