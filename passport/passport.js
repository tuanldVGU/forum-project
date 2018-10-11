var localStrategy = require('passport-local').Strategy;
var User = require('../models/user')
var facebookStrategy = require('passport-facebook').Strategy;
//const passportJWT = require("passport-jwt");
//const ExtractJWT = passportJWT.ExtractJwt;
var jwt =require('jsonwebtoken');



module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (user, done){
        done(null, user)
        
    })
    var generateToken = function(username, id){
        key = 'secrettoken';
        const token = jwt.sign({
            username: username,
            userID: id,
          },key,
          {
            expiresIn: '3h'
          });
    }

    passport.use(new facebookStrategy({
        clientID: '889945071201359',
        clientSecret:  '9ed19d203186784ff9055e552114df60',
        callbackURL: 'https://motor-forum.herokuapp.com/auth/signin/facebook/return'
      },  function(accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
      }))
    passport.use(new localStrategy(
        {
            usernameField: 'usr',
            passwordField: 'pwd'
        },
        function (username,password, done) {
            //console.log(username + " "+ password);
         User.findOne({
             username: username
         }, function (err, doc) {
             if (err) {
                 done(err,req.flash('message',err))
             } else {
                 if (doc) {
                     var valid = doc.comparePassword(password, doc.password)
                     if (valid) {
                        key = 'secrettoken';
                       // done(null,{username:doc.username,token :doc.token})
                        // token=generateToken(doc.username,doc._id)
                         // do not add password hash to session
                          done(null,{
                            username:doc.username, 
                            token : jwt.sign({
                            username: doc.username,
                             userID: doc._id,
                           },key,
                           {
                             expiresIn: '3h'
                           })
                        })}
                      else {
                         done(null, false,req.flash('message','Wrong pass'))
                     }}
                  else {
                     done(null, false, req.flash('message','Not found username'))
                 }
             }
         })
    }))
}