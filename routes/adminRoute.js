var express = require('express');
var router = express.Router();
var loggedinadmin = function (req, res, next) {
    if (req.isAuthenticated()&& req.session.passport.user.rule=="admin") {
      next()
    } else {
      res.redirect('/logout')
    }
  }

router.get('/',loggedinadmin, function(req,res,next){
    res.render('./admin/dashboard',{title:"Motor || Dashboard"});
});

router.get('/report',loggedinadmin, function(req,res,next){
    res.render('./admin/report',{title:"Motor || Report "});
});

router.get('/category',loggedinadmin, function(req,res,next){
    res.render('./admin/category',{title:"Motor || Category"});
});

router.get('/forum',loggedinadmin, function(req,res,next){
    res.render('./admin/forumadmin',{title:"Motor || Forum control"});
});

module.exports = router;