const _ = require('lodash');
const mongoose = require('mongoose');

const user = mongoose.model('user');

const { ObjectId } = mongoose.Types;
class userService {
  static getDetail(userId) {
    //console.log({userId});
  
    return user.findById(userId).exec();
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
  
  static getAllDetail(){
    return user.find().exec();
  }

  static updateRole(id,role){
    return user.findOneAndUpdate({_id: id},{userType:role}).exec();
  }
  
  static deleteUser(id){
    return user.findByIdAndDelete(id).exec();
  }

}
module.exports = userService;
