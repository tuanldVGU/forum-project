const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: { type: String, unique: true, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  userType: {
    type: String,
    default: 'user',
    enum: [
      'admin',
      'mod',
      'user',
    ],
  },
}, {
  collection: 'user',
  timestamps: true,
});

module.exports = mongoose.model('user', schema);
