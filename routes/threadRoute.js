var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
    res.render('./thread/forum',{title:"Welcome to Motor forum"});
});

router.get('/post', function(req,res,next){
    res.render('./thread/newsPost',{title:"Motor || Post new thread"});
});


module.exports = router;