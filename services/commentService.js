const _ = require('lodash');
const mongoose = require('mongoose');

const comment = mongoose.model('comment');

const { ObjectId } = mongoose.Types;
class commentService {
  static getDetail() {
    return comment.find().exec();
  }
}
module.exports = commentService;
