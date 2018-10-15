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
  static getUserPost(userId) {
    return post.find({user: ObjectId(userId)}).exec();
  }
  static createPost({category, forumList, user, title, description}){
    return post.create({category: category, forumList: forumList, user: user, title: title, description: description});
  }
  static deletePost({postId}){
    console.log(postId);
    return post.findByIdAndRemove(postId).exec();
  }
}
module.exports = postService;
