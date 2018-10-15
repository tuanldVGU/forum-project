const _ = require('lodash');
const mongoose = require('mongoose');

const forumList = mongoose.model('forumList');
const post = mongoose.model('post');

const { ObjectId } = mongoose.Types;
class forumListService {
  static getDetail(forumId) {
    return Promise.all([
      forumList.find().exec(),
      post.countDocuments({ forumList: ObjectId(forumId) }).exec(),
      post.find({ forumList: ObjectId(forumId) }).sort({ "_id": -1 }).limit(1),
    ]);


  }
  static addForum({category, forumName}){
    return forumList.create({category: category, forumName: forumName});
  }
}
module.exports = forumListService;
