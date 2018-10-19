var express = require('express');
var router = express.Router();
var loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/signin')
    }
  }

router.get('/',loggedin, function(req,res,next){
    res.render('./thread/forum',{title:"Welcome to Motor forum"});
});

router.get('/newforum', loggedin,function(req,res,next){
    res.render('./thread/newForum',{title:"Motor || Create forum"});
});

router.get('/post',loggedin, function(req,res,next){
    res.render('./thread/newPost',{title:"Motor || Post new thread"});
});

router.get('/thread',loggedin, function(req,res,next){
    console.log(req.params);
    res.render('./thread/thread',{title:"Motor || "});
});

router.get('/article',loggedin, function(req,res,next){
    res.render('./thread/article',{title:"Motor || "});
});

router.get('/modifyPost',loggedin, function(req,res,next){
    console.log(req.param);
    res.render('./thread/modifyPost',{title:"Motor || "});
});

module.exports = router;