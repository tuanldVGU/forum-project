require('./init');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const user = mongoose.model('user');
const category = mongoose.model('category');
const comment = mongoose.model('comment');
const subcomment = mongoose.model('subcomment');
const post = mongoose.model('post');
user.deleteMany({}).exec()
  .then(() => category.deleteMany({}).exec())
  .then(() => comment.deleteMany({}).exec())
  .then(() => subcomment.deleteMany({}).exec())
  .then(() => post.deleteMany({}).exec())
  .then(() => user.create({
    username: '',
    
  }))

