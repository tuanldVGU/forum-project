const _ = require('lodash');
const mongoose = require('mongoose');

const report = mongoose.model('report');
const utils = require('../ultis/ultis');
const { ObjectId } = mongoose.Types;
class postService {
  static getDetail(postId) {
    return report.find({post:postId}).exec();
  }
  static getAllDetail(){
    return report.find().exec();
  }
  static createReport(postId,userId,reason,user){
    console.log(forumList);
    return report.create({post: postId,author:userId, reason:reason, reporter:user});
  }
}
module.exports = reportService;
