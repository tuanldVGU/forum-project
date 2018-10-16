var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
    res.render('./thread/forum',{title:"Welcome to Motor forum"});
});

router.get('/newforum', function(req,res,next){
    res.render('./thread/newForum',{title:"Motor || Create forum"});
});

router.get('/post', function(req,res,next){
    res.render('./thread/newPost',{title:"Motor || Post new thread"});
});

router.get('/thread', function(req,res,next){
    res.render('./thread/thread',{title:"Motor ||"});
});

router.get('/article', function(req,res,next){
    res.render('./thread/article',{title:"Motor ||"});
});

module.exports = router;