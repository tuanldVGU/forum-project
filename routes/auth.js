var express = require('express');
var router = express.Router();
var User = require('../db/User');
var bcrypt =require('bcrypt-nodejs');

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
    successRedirect: '/home'
}), function (req, res) {
   // res.render('home', {title:"Motor || Home",user: req.Userr})
   res.send('hey')
})
  router.get('/signin/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/signin', successRedirect: '/home'}))
 // function(req, res) {
//    res.render('home',{title:"Motor || Home",user: req.User});
   // res.render('profile')
//})
  router.get('/signin/facebook',
  passport.authenticate('facebook'));
  return router;
};

