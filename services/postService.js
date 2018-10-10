const _ = require('lodash');
const mongoose = require('mongoose');

const post = mongoose.model('post');

const { ObjectId } = mongoose.Types;
class postService {
  static getDetail() {
    return post.find().exec();
  }
}
module.exports = postService;
