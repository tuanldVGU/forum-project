const _ = require('lodash');
const mongoose = require('mongoose');

const post = mongoose.model('post');

const { ObjectId } = mongoose.Types;
class postService {
  static getDetail() {
    return post.find().exec();
  }
  static getSumPost(){
    return post.countDocuments().exec();
  }
}
module.exports = postService;
