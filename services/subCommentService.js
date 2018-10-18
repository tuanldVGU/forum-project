const _ = require('lodash');
const mongoose = require('mongoose');

const subComments = mongoose.model('subComment');
const comments = mongoose.model('comment');
const posts = mongoose.model('post');

const { ObjectId } = mongoose.Types;

class subCommentService {
  static getDetail() {
    return subComments.find().exec();
  }
  static createSubComment({ post, comment, user, content }){

    return posts.findOneAndUpdate({_id: ObjectId(post)}, { $inc: { numOfComment:1 } , recentComment: content}, {new: true }).exec()
      .then(() => subComments.create({ post: post, comment: comment, user: user, content: content })
        .then((_subComment)=> comments.findOneAndUpdate({_id: comment}, { "$push": { "subComment": _subComment } }))
        .then(
          //console.log("im here");
        ));
  }
}
module.exports = subCommentService;
