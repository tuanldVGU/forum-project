const _ = require('lodash');
const mongoose = require('mongoose');
const post= mongoose.model('post');
const report = mongoose.model('report');
const utils = require('../ultis/ultis');
const { ObjectId } = mongoose.Types;
class reportService {
  static getDetail(postId) {
    return report.find({post:postId}).exec();
  }
  static getAllDetail(){
    return report.find().exec();
  }
  static createReport({postId,reason,user,title}){
    console.log(postId,reason,user,title);

    return post.findOneAndUpdate({_id:postId},{reported:true}).exec().
    then(()=>report.create({post: postId, reason:reason, reporter:user, title:title}));
    
  }
  static deleteReport({reportId,postId}){
    console.log("ReId:",reportId,"PostId",postId);
    return report.findOneAndRemove({_id:reportId}).exec()
    .then(()=> report.findOne({post:postId},function(err,doc){
      if(err){throw err;}
      else{
        if(!doc){post.findOneAndUpdate({_id:postId},{reported:false}).exec();}
      }
    }))
  }
  static deleteAllReport(){
    return report.deleteMany({}).exec()
    .then(()=>post.updateMany({},{reported:false}).exec())
  }
}
module.exports = reportService;
