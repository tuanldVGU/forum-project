var localStrategy = require('passport-local').Strategy;
var User = require('../db/User')
var facebookStrategy = require('passport-facebook').Strategy;


module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (user, done){
        done(null, user)
        
    })
    passport.use(new facebookStrategy({
        clientID: '889945071201359',
        clientSecret:  '9ed19d203186784ff9055e552114df60',
        callbackURL: 'http://localhost:8080/auth/signin/facebook/return'
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
                         // do not add password hash to session
                         done(null, {
                             username: doc.username,
                             id: doc._id
                         })
                     } else {
                         done(null, false,req.flash('message','Wrong pass'))
                     }
                 } else {
                     done(null, false, req.flash('message','Not found username'))
                 }
             }
         })
    }))
}