const _ = require('lodash');
const mongoose = require('mongoose');

const subComment = mongoose.model('subComment');

const { ObjectId } = mongoose.Types;

class subCommentService {
  static getDetail() {
    return subComment.find().exec();
  }
}
module.exports = subCommentService;
