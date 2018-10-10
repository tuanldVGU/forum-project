var express = require('express');
var router = express.Router();
var User=require('../models/user');
var jwt=require('jsonwebtoken');
var loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/signin')
    }
  }

router.get('/', function(req,res,next){
    res.render('index',{title:"welcome to Motor"});
});

router.get('/signup', function(req,res,next){
    res.render('signup',{title:"Motor || Sign Up"});
});

router.get('/signin', function(req,res,next){
    res.render('signin',{title:"Motor || Sign In"});
});

router.get('/home', loggedin,function(req,res,next){
    res.render('home',{title:"Motor || Home", user:req.user});
});
router.get('/profile',loggedin,function(req,res,next){
    //console.log(req.session+ "    "+ req.User);
    console.log(req.session.passport.user.token);
    res.send(jwt.verify(req.session.passport.user.token, 'secrettoken'));
   // res.render('profile',{ user: req.user});
})
router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

router.get('/tech', loggedin,function(req,res,next){
    res.render('tech',{title:"Motor || Technical support"});
});

router.get('/about', loggedin,function(req,res,next){
    res.render('about',{title:"Motor || About us"});
});



module.exports = router;