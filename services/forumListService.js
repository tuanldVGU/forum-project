const _ = require('lodash');
const mongoose = require('mongoose');

const forumList = mongoose.model('forumList');

const { ObjectId } = mongoose.Types;
class forumListService {
  static getDetail() {
    return forumList.find().exec();
  }
  static addForum({category, forumName}){
    return forumList.create({category: category, forumName: forumName});
  }
}
module.exports = forumListService;
