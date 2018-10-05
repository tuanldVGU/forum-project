var localStrategy = require('passport-local').Strategy;
var User = require('../db/User')


module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (user, done){
        done(null, user)
        
    })

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