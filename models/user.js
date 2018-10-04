const mongoose = require('mongoose');
const SALT_ROUNDS = 15;
const bcrypt = require('bcryptjs');
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

schema.pre('save', function preSave(next) {
  if (this.isModified('password')) {
    const that = this;


    return bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
      that.password = hash;
      return next();
    });
  }

  return next();
});

module.exports = mongoose.model('user', schema);
