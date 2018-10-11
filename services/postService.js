const _ = require('lodash');
const mongoose = require('mongoose');

const post = mongoose.model('post');
const category = mongoose.model('category');

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
  static createPost({_category, forumList, user, title, description}){

    return post.create({category: _category, forumList: forumList, user: user, title: title, description: description});
  }
}
module.exports = postService;
