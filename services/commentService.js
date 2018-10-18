const _ = require('lodash');
const mongoose = require('mongoose');

const comments = mongoose.model('comment');
const posts = mongoose.model('post');
const subcomment =mongoose.model('subComment') 

const { ObjectId } = mongoose.Types;
class commentService {
  static getDetail(postId) {
    return comments.find({post: postId}).populate('user').populate('subComment').exec();
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
  static getPostComment(postId){
    console.log(postId);
    return comment.find({post:postId}).exec();
  }
  static deleteComment({commentId, postId}){
    console.log(commentId,postId);

   return subcomment.deleteMany({comment:commentId}).exec()
   .then(()=>comment.find({post:postId}).sort({"_id":-1}).limit(2).then((_comment)=>{
     const commentDetail = utils.succeed(_comment).data;
     if(commentDetail.length>1){
       if(commentDetail[0]._id==commentId)
       {
        console.log("Recent comment" ) 
        return post.findOneAndUpdate({_id:postId},{$inc:{numOfComment:-1},recentComment:commentDetail[1].content},{new:true}).exec()
        .then(()=>comment.findOneAndDelete({_id:commentId}).exec())
       }
       else{
         console.log("Normal comment")
          return post.findOneAndUpdate({_id:postId},{$inc:{numOfComment:-1}},{new: true}).exec()
      .then(()=>comment.findOneAndDelete({_id:commentId}).exec()) }

     }
     else{
       console.log("Only one comment")
      return post.findOneAndUpdate({_id:postId},{numOfComment:0 ,recentComment:''},{new:true}).exec()
      .then(()=>comment.findOneAndDelete({_id:commentId}).exec())
     }
   }))
    
  }
  

}
module.exports = commentService;
