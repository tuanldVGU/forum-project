const mongoose = require('mongoose');

const schema = mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', default: undefined },
  forumList : { type: mongoose.Schema.Types.ObjectId, ref: 'forumList', default: undefined },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: undefined },
  title: { type: String, require: true },
  description: { type: String, require: true },
  views: { type: Number, default: 0 },
  reported: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false }

}, {
  collection: 'post',
  timestamps: true,
});

module.exports = mongoose.model('post', schema);
