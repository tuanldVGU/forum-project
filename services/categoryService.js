const _ = require('lodash');
const mongoose = require('mongoose');

const category = mongoose.model('category');

const { ObjectId } = mongoose.Types;
class categoryService {
  static getDetail() {
    return category.find().exec();
  }
}
module.exports = categoryService;
