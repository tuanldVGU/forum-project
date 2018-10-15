const _ = require('lodash');
const mongoose = require('mongoose');

const user = mongoose.model('user');

const { ObjectId } = mongoose.Types;
class userService {
  static getDetail() {
    return user.find().exec();
  }
}
module.exports = userService;
