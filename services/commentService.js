const _ = require('lodash');
const mongoose = require('mongoose');

const comments = mongoose.model('comment');
const posts = mongoose.model('post');

const { ObjectId } = mongoose.Types;
class commentService {
  static getDetail(postId) {
    return comments.find({post: postId}).exec();
  }
  static getSumComment(postId){
  console.log(postId);
    return comments.countDocuments({ post: ObjectId(postId) }).exec();
  }
  static createComment({ post, user, content }){

    return posts.findOneAndUpdate({_id: ObjectId(post)}, { $inc: { numOfComment:1 } , recentComment: content}, {new: true }).exec()
      .then(() => comments.create({ post: post, user: user, content: content })
      .then(
           //console.log("im here");
      ));
  }

}
module.exports = commentService;
