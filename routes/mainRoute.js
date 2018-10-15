var express = require('express');
var router = express.Router();
var User=require('../models/user');
var Post=require('../models/post')
var Category=require('../models/category');
var jwt=require('jsonwebtoken');
var url=require('url');
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
    res.render('home',{title:"Motor || Home"});
});

router.get('/profile',function(req,res,next){
    res.render('profile',{title:"Motor || Profile"});
})

router.get('/google', loggedin,function(req,res,next){
   //console.log(res.session);
   var user=jwt.verify(req.session.passport.user.token,"googletoken");
   User.findOne({loginGoogle:user.googleID},function(err,doc)
   {
        if(err){throw err;}
        else
        {
            if(doc){
                res.cookie('usrName',doc.username);
                var newtoken=jwt.sign({username:doc.username,userID:doc._id},"secrettoken",{expiresIn: '3h'}) 
                res.cookie('token',newtoken)
                res.render('home',{title:"Motor || Home"});}
            else{
            User.findOne({email:user.email},function(err,doc)
            {
                if(err){throw err;}
                else{
                    if(doc)
                    {
                        var record=doc;
                        var myquery={ _id:doc._id};
                        var newvalue={$set:{loginGoogle:user.googleID}};
                        User.updateOne(myquery,newvalue,function(err,doc){
                            if(err){res.status(500).send("Error in update database")}
                            else{res.cookie('usrName',record.username);
                            var newtoken=jwt.sign({username:record.username,userID:record._id},"secrettoken",{expiresIn: '3h'}) 
                            res.cookie('token',newtoken)
                            res.render('home',{title:"Motor || Home"});}})

                    }
                    else{
                        res.render('usergoogle',{ title:"Motor || Set Username",});   
                    }
                }
            })
        }}
   })
});


router.get('/facebook',loggedin,function(req,res,next){
  //  res.send(jwt.verify(req.session.passport.user.tokenface,"facebooktoken"))
   //res.cookie('token',req.session.passport.user.token);
    var user=jwt.verify(req.session.passport.user.tokenface,"facebooktoken");
    User.findOne({loginFacebook:user.faceID},function(err,doc)
    {
        if(err){throw err;}
        else
        {
            if(doc){
                res.cookie('usrName',doc.username);
                var newtoken=jwt.sign({username:doc.username,userID:doc._id},"secrettoken",{expiresIn: '3h'}) 
                res.cookie('token',newtoken)
                res.render('home',{title:"Motor || Home"});}
            else{
                User.findOne({email:user.email},function(err,doc)
                {
                    if(err){throw err;}
                    else
                    {
                        if(doc)
                        {   var record=doc;
                             var myquery={ _id:doc._id};
                            var newvalue={$set:{loginFacebook:user.faceID}};
                            User.updateOne(myquery,newvalue,function(err,doc){
                                if(err){res.status(500).send("Error in update database")}
                                else
                                {
                                  res.cookie('usrName',record.username);
                                  var newtoken=jwt.sign({username:record.username,userID:record._id},"secrettoken",{expiresIn: '3h'}) 
                                  res.cookie('token',newtoken)
                                  res.render('home',{title:"Motor || Home"});
                                  //  res.send(record)
                                }
                            })
                        }
                        else
                        {
                            res.render('userface',{ title:"Motor || Set Username",})
                        }
                    }
                })
            }
        }

    })
})
router.post('/FacebookUser',function(req,res){
    var user=jwt.verify(req.session.passport.user.tokenface,"facebooktoken");
    var record=new User();
    var record = new User()
    record.username = req.body.usr;
    record.loginFacebook=user.faceID;
    record.email=user.email;
    record.save(function(err,user){
        if(err){
            res.status(500).send(err)
        }
        else{
            //res.send(user)
            User.findOne({username:record.username},function(err,doc){
                if(err){throw err;}
                else{
                    res.cookie('usrName',doc.username);
                    var newtoken=jwt.sign({username:doc.username,userID:doc._id},"secrettoken",{expiresIn: '3h'}) 
                    res.cookie('token',newtoken)
                    res.render('home',{title:"Motor || Home"});

                }
            })}
    })
})
router.post('/googleUser',function(req,res){
    //console.log(req.body.usr);
    //console.log(req.session)
    var user=jwt.verify(req.session.passport.user.token,"googletoken");
   // console.log(user)
    var record=new User();
    var record = new User()
    record.username = req.body.usr;
    record.loginGoogle=user.googleID;
    record.email=user.email;
    record.save(function(err,user){
        if(err){
            res.status(500).send(err)
        }
        else{
            User.findOne({username:record.username},function(err,doc){
                if(err){throw err;}
                else{
                    res.cookie('usrName',doc.username);
                    var newtoken=jwt.sign({username:doc.username,userID:doc._id},"secrettoken",{expiresIn: '3h'}) 
                    res.cookie('token',newtoken)
                    res.render('home',{title:"Motor || Home"});

                }
            })
        }
    })
})
router.get('/logout', function (req, res) {
    req.logout()
    res.clearCookie("usrName");
    res.clearCookie("token")
    res.redirect('/')
  })
router.get('/resetPassword',function(req, res)
{
    res.render('reset',{ title:"Motor || Reset Password"})
})

// router.get('/tech', loggedin,function(req,res,next){
//     res.render('tech',{title:"Motor || Technical support"});
// });
router.get('/setPassword', function(req,res){
 var q=url.parse(req.url,true).query;
 res.cookie("tokenreset",q.token)
  res.render('setPassword',{title:"Motor || Set New Password"})
})
router.get('/tech', loggedin,function(req,res,next){
    res.render('search',{title:"Motor || Technical support"});
});
router.post('/search', function(req, res){
    var query={transportType :req.body.transportType,
               transportModel:req.body.transportModel,
               transportYear: req.body.transportYear,
               transportManufacture:req.body.transportManufacture,
              }
    var titleq=req.body.Problem;
   // console.log(query,titleq)
    Category.find(query, function(err,doc){
      if(err) {throw err;}
      //res.send(doc)
      id=doc[0]._id;
    Post.find({category:id, title:new RegExp(titleq,'i')},function(err,doc){
      if(err){throw err;}
      //res.send(doc)
      var text=[];
      for(i=0; i<doc.length;i++){
          text.push(doc[i]._id);
      }
      res.send(text)
    })})
  })
router.get('/about', loggedin,function(req,res,next){
    res.render('about',{title:"Motor || About us"});
});
router.get('/redirect', loggedin,function(req,res,next){
    //res.send(req.session);
    res.cookie('usrName',req.session.passport.user.username); 
    res.cookie('token',req.session.passport.user.token)
    res.render('home',{title:"Motor || Home"});
});



module.exports = router;