const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var mail= require('../javascripts/components/mailer')


module.exports = function(passport){
    /* GET home page. */
    router.post('/signup', function(req, res) {
      //  res.send(req.body.usr+ " "+ req.body.pwd +" "+ req.body.email);
        var body = req.body,
            username=body.usr,
            email=body.email,
            password=body.pwd;
       // res.send(username+" "+email+" "+password);
        User.findOne({username:username},
             function(err,doc){
            if(err){res.status(500).send('error occured')}
            else{
                if(doc){
                    res.status(500).send('username already on database')
                }
                else {
                    var record = new User()
                        record.username = username
                        record.password= record.hashPassword(password)
                        record.email=email;
                        //res.send(record);
                        record.save(function(err,user){
                            if(err){
                                res.status(500).send(err)
                            }
                            else{
                                //res.send(user)
                                res.redirect('/signin')
                            }
                        })
                    }
                }
            })

        });
    //  router.post('/login',passport.authenticate)
    router.post('/signin',passport.authenticate('local', {
    failureRedirect: '/signin',
    successRedirect: '/redirect'}
    //,function(req,res){
    //res.cookie('usrName',req.session.passport.user.username);
    //res.cookie('token',req.session.passport.user.token);
//}
));
router.get('/signin/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
] }));

router.get('/signin/google/return', 
  passport.authenticate('google', { failureRedirect: '/signin' }),
  function(req, res) {
    res.redirect('/google');
  });
  router.get('/signin/facebook/return',
  passport.authenticate('facebook',{ failureRedirect: '/signin', successRedirect: '/facebook'}))
  router.get('/signin/facebook',
  passport.authenticate('facebook',{scope:["email"]}));
  router.post('/reset', function(req,res){
      var email= req.body.email;
      User.findOne({email:email},
        function(err,doc){
            if(err){res.status(500).send('Error occured!!');}
            else{
                if(!doc){res.status(500).send('Email not exits.')}
                else{
                    key="passwordtoken";
                    const token=jwt.sign({username:doc.username, userId: doc.id},key,{expiresIn:'15m'});
                    mail(doc.email,'Reset password','Please click to the link https://motor-forum.herokuapp.com/setPassword?token='+token+' to reset password. This request will expire in 15 minute. Thank you')
                    res.send('Please check your email to reset password!!')}
            }
        })
  })
  router.post('/setpass',function(req,res){
    var text= jwt.verify(req.cookies.tokenreset,'passwordtoken');
   // res.send(text);
    var record=new User();
   // res.send(req.body.userId)
    userId=text.userId,
    password=record.hashPassword(req.body.newPass);
   var myquery={ _id:userId};
   var newvalue={$set:{password:password}};
   User.updateOne(myquery,newvalue,function(err,doc){
       if(err){res.status(500).send("Error in update database")}
       else{res.clearCookie("passwordtoken");
           res.redirect('/signin')}
   })
 })
  return router;
};

