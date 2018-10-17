const _ = require('lodash');
const mongoose = require('mongoose');

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
  static createReport({postId,reason,user}){
    console.log(postId,reason,user);
    return report.create({post: postId, reason:reason, reporter:user});
  }
}
module.exports = reportService;
