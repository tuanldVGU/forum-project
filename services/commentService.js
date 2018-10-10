const _ = require('lodash');
const mongoose = require('mongoose');

const comment = mongoose.model('comment');

const { ObjectId } = mongoose.Types;
class commentService {
  static getDetail() {
    return comment.find().exec();
  }
  static getSumComment(postId){
  console.log(postId);
    return comment.countDocuments({ post: ObjectId(postId) }).exec();
  }

}
module.exports = commentService;
