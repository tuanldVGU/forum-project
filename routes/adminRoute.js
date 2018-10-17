var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
    res.render('./admin/dashboard',{title:"Motor || Dashboard"});
});

router.get('/report', function(req,res,next){
    res.render('./admin/report',{title:"Motor || Report "});
});

router.get('/category', function(req,res,next){
    res.render('./admin/category',{title:"Motor || Category"});
});

router.get('/forum', function(req,res,next){
    res.render('./admin/forumadmin',{title:"Motor || Forum control"});
});

module.exports = router;