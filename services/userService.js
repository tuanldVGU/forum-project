const _ = require('lodash');
const mongoose = require('mongoose');

const user = mongoose.model('user');

const { ObjectId } = mongoose.Types;
class userService {
  static getDetail() {
    return user.find().exec();
  }
  static checkUsername(username) {
    console.log("1")
     user.findOne({username:username},function(err,doc){
          if(err){throw err;}
          else{
            console.log('2')
            if(doc){console.log('3')
              return true; }
            else{return false;}
          }
     })
  }
  static checkEmail(email) {
    user.find({email:email},function(err,doc){
         if(err){throw err;}
         else{
           if(doc){return true; }
           else{return false;}
         }
    })
 }
}
module.exports = userService;
