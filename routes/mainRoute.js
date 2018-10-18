var express = require('express');
var router = express.Router();
var User=require('../models/user');
var Post=require('../models/post')
var Category=require('../models/category');
var jwt=require('jsonwebtoken');
var url=require('url');
var mail= require('../javascripts/components/mailer')
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
    res.render('auth/signup',{title:"Motor || Sign Up"});
});

router.get('/signin', function(req,res,next){
    res.render('auth/signin',{title:"Motor || Sign In"});
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
                var newtoken=jwt.sign({userID:doc._id},"secrettoken",{expiresIn: '3h'}) 
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
                            var newtoken=jwt.sign({userID:record._id},"secrettoken",{expiresIn: '3h'}) 
                            res.cookie('token',newtoken)
                            res.render('home',{title:"Motor || Home"});}})

                    }
                    else{
                        res.render('auth/usergoogle',{ title:"Motor || Set Username",});   
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
                var newtoken=jwt.sign({userID:doc._id},"secrettoken",{expiresIn: '3h'}) 
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
                                  var newtoken=jwt.sign({userID:record._id},"secrettoken",{expiresIn: '3h'}) 
                                  res.cookie('token',newtoken)
                                  res.render('home',{title:"Motor || Home"});
                                  //  res.send(record)
                                }
                            })
                        }
                        else
                        {
                            res.render('auth/userface',{ title:"Motor || Set Username",})
                        }
                    }
                })
            }
        }

    })
})
router.post('/facebookUser',function(req,res){
    var user=jwt.verify(req.session.passport.user.tokenface,"facebooktoken");
    var record=new User();
    var record = new User()
    record.username = req.body.usr;
    record.loginFacebook=user.faceID;
    record.email=user.email;
    User.findOne({username:record.username},function(err,doc){
        if(err){res.status(500).send(err)}
        else{
            if(doc){res.status(500).send("Username already use please try another one")}
            else{    record.save(function(err,user){
                if(err){
                    res.status(500).send(err)
                }
                else{
                    //res.send(user)
                    User.findOne({username:record.username},function(err,doc){
                        if(err){res.status(500).send( err);}
                        else{
                            res.cookie('usrName',doc.username);
                            var newtoken=jwt.sign({userID:doc._id},"secrettoken",{expiresIn: '3h'}) 
                            res.cookie('token',newtoken)
                            res.send("Success!!");
        
                        }
                    })}
            })

            }
        }
    })

})
router.post('/googleUser',function(req,res){
    var user=jwt.verify(req.session.passport.user.token,"googletoken");
    var record = new User()
    record.username = req.body.usr;
    record.loginGoogle=user.googleID;
    record.email=user.email;
    User.findOne({username:record.username},function(err,doc){
        if(err){throw err;}
        else
        {
            if(doc){res.status(500).send("Username already used please try another one")}
            else{
                record.save(function(err,user){
                    if(err){
                        res.status(500).send(err)
                    }
                    else{
                        User.findOne({username:record.username},function(err,doc){
                            if(err){res.status(500).send( err);}
                            else{
                                res.cookie('usrName',doc.username);
                                var newtoken=jwt.sign({userID:doc._id},"secrettoken",{expiresIn: '3h'}) 
                                res.cookie('token',newtoken)
                                res.send('Success!!');
            
                            }
                        })
                    }
                })
            }
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
    res.render('auth/reset',{ title:"Motor || Reset Password"})
})

// router.get('/tech', loggedin,function(req,res,next){
//     res.render('tech',{title:"Motor || Technical support"});
// });
router.get('/setPassword', function(req,res){
 var q=url.parse(req.url,true).query;
 res.cookie("tokenreset",q.token)
  res.render('auth/setPassword',{title:"Motor || Set New Password"})
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
router.post('/forwardthread',function(req,res,next){
    console.log(req.body.link, req.body.email, req.body.username);
    link=req.body.link;
    email=req.body.email;
    name=req.body.username;
    mail(email,'The thread are shared by your friend','Your friend '+name+' share the post from Motor-Forum to you. \nPlease click to the link '+link +' to visit the Motor Forum and enjoy the post. \nThank you. \nVGU Team 1.');
    res.send("Email was sent")
})
router.get('/redirect', loggedin,function(req,res,next){
    console.log(req.session.passport.user.rule=="admin");
    if(req.session.passport.user.rule=="admin")
    {
    console.log("admin");
    res.cookie('usrName',req.session.passport.user.username); 
    res.cookie('token',req.session.passport.user.token)
    res.send({rule:req.session.passport.user.rule});}
    else{
    console.log("user")
    res.cookie('usrName',req.session.passport.user.username); 
    res.cookie('token',req.session.passport.user.token)
    res.send({rule:req.session.passport.user.rule});
}
});



module.exports = router;