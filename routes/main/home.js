const router = require('express').Router();
router.get('/home', function(req,res,next){
  res.render('home',{title:"Motor || Home"});
});
module.exports = router;
