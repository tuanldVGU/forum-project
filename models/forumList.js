const mongoose = require('mongoose');

const schema = mongoose.Schema({
  forumName: { type: String, require: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', default: undefined },
}, {
  collection: 'forumList',
  timestamps: true,
});

module.exports = mongoose.model('forumList', schema);
