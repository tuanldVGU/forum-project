const _ = require('lodash');
const mongoose = require('mongoose');

const posts = mongoose.model('post');
const category = mongoose.model('category');
const forumLists = mongoose.model('forumList');
const comments = mongoose.model('comment');
const subComments = mongoose.model('subComment');
const utils = require('../ultis/ultis');
const { ObjectId } = mongoose.Types;

class postService {
  static getDetail(forumId) {
    return posts.find({forumList: forumId}).exec();
  }
  static getAllDetail(){
    return posts.find().exec();
    // const forumId = "5bc7f92f7c95bf014833b224";
    // return posts.aggregate([
    //   {$match:{"forumList":ObjectId(forumId)}},
    //   {$group: {"_id": "$forumId", "result": {$sum:"$numOfComment"} }}
    // ]).then(countAll => {
    //   console.log(countAll[0].result);
    // })
  }
  static getSumPost(){
    return posts.countDocuments().exec();
  }
  static getPost(postId) {
    return posts.findById(postId).exec();
  }
  static searchPost(categoryid, title){
    return posts.find({category:categoryid, title:new RegExp(title,'i')}).exec();
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
      .then(() => comments.findOneAndRemove({post: postId})).exec()
      .then(() => subComments.findOneAndRemove({post: postId})).exec()
      .then(()=>posts.find({ forumList: forumId }).sort({ "_id": -1 }).limit(1).then((_post) => {
        const postDetail = utils.succeed(_post).data;
        if(postDetail.length>0){
          return posts.aggregate([
            {$match:{"forumList":ObjectId(forumId)}},
            {$group: {"_id": "$forumId", "result": {$sum:"$numOfComment"} }}
          ]).then(countAll => {
            console.log(countAll[0].result);
            return forumLists.findOneAndUpdate({_id: ObjectId(forumId)}, { $inc: { numOfPost: -1 } , recentPost: postDetail[0].title, numOfComment: countAll[0].result }, {new: true }).exec();
          })
          
        }
        return forumLists.findOneAndUpdate({_id: ObjectId(forumId)}, {  numOfPost: 0 , recentPost: '', numOfComment: 0 }, {new: true }).exec();

    }))
  }
  static modifyPost({category,postid, user, title, description})
  {
    return posts.findOneAndUpdate({ _id: postid },
    {category: category, user: user, title: title, description: description})
    .exec();
  }

}
module.exports = postService;
