const _ = require('lodash');
const mongoose = require('mongoose');

const user = mongoose.model('user');

const { ObjectId } = mongoose.Types;
class userService {
  static getDetail(userId) {
    //console.log({userId});
  
    return user.findById(userId).exec();
  }
}
module.exports = userService;
