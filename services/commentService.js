const _ = require('lodash');
const mongoose = require('mongoose');

const comment = mongoose.model('comment');

const { ObjectId } = mongoose.Types;
class commentService {
  static getDetail(postId) {
    return comment.find({post: postId}).exec();
  }
  static getSumComment(postId){
  console.log(postId);
    return comment.countDocuments({ post: ObjectId(postId) }).exec();
  }

}
module.exports = commentService;
