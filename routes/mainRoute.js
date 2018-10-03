var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
    res.render('index',{title:"welcome to Motor"});
});

router.get('/signup', function(req,res,next){
    res.render('signup',{title:"Motor || Sign Up"});
});

router.get('/signin', function(req,res,next){
    res.render('signin',{title:"Motor || Sign In"});
});

router.get('/home', function(req,res,next){
    res.render('home',{title:"Motor || Home"});
});


module.exports = router;