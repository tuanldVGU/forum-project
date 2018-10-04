const router = require('express').Router();

router.get('/signin', function(req,res,next){
  res.render('signin',{title:"Motor || Sign In", returnUrl: req.query.returnUrl});
});

router.post('/singin'), (req, res) => {
  return res.redirect('/')
};

module.exports = router;
