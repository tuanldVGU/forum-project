const _ = require('lodash');
const mongoose = require('mongoose');

const post = mongoose.model('post');

const { ObjectId } = mongoose.Types;
class postService {
  static getDetail(forumId) {
    return post.find({forumList: forumId}).exec();
  }
  static getSumPost(){
    return post.countDocuments().exec();
  }
  static getPost(postId) {
    return post.findById(postId).exec();
  }
}
module.exports = postService;
