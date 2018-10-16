const _ = require('lodash');
const mongoose = require('mongoose');

const posts = mongoose.model('post');
const category = mongoose.model('category');
const forumLists = mongoose.model('forumList');

const { ObjectId } = mongoose.Types;
class postService {
  static getDetail(forumId) {
    return posts.find({forumList: forumId}).exec();
  }
  static getAllDetail(){
    return posts.find().exec();
  }
  static getSumPost(){
    return posts.countDocuments().exec();
  }
  static getPost(postId) {
    return posts.findById(postId).exec();
  }
  static getUserPost(userId) {
    return posts.find({user: ObjectId(userId)}).exec();
  }
  static createPost({category,forumList, user, title, description}){
    console.log(forumList);

    return forumLists.findOneAndUpdate({_id: ObjectId(forumList)}, { $inc: { numOfPost:1 } , recentPost: title}, {new: true }).exec()
      .then(() => posts.create({category: category, forumList: forumList, user: user, title: title, description: description}))
      ;
  }
  static deletePost({postId, forumId}){
    return posts.findByIdAndRemove(postId).exec()
      .then(()=> forumLists.findOneAndUpdate({_id: ObjectId(forumId)}, { $inc: { numOfPost: -1 } }, {new: true }).exec())
  }
}
module.exports = postService;
