const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const schema = mongoose.Schema;
const userSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  userType: {
    type: String,
    default: 'user',
    enum: [
      'admin',
      'mod',
      'user',
    ],
  },
});
userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password,hash){
    return bcrypt.compareSync(password,hash)
}
module.exports=mongoose.model('user',userSchema, 'user');
