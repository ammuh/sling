 var passport = require('passport');

 function initStrategy() {
     var LocalStrategy = require('passport-local').Strategy;
     var mongoose = require('mongoose');
     var users = mongoose.model('Users');
     passport.use(new LocalStrategy(
         function(username, password, done) {
             User.findOne({ username: username }, function(err, user) {
                 if (err) { return done(err); }
                 if (!user) {
                     return done(null, false, { message: 'Incorrect username.' });
                 }
                 if (!user.validPassword(password)) {
                     return done(null, false, { message: 'Incorrect password.' });
                 }
                 return done(null, user);
             });
         }
     ));

     passport.serializeUser(function(user, done) {
         done(null, user.id);
     });

     passport.deserializeUser(function(id, done) {
         users.findById(id, function(err, user) {
             if (err) done(err);
             if (user) {
                 done(null, user);
             } else {
                 done(null, false, { message: 'Incorrect password.' });
             }
         });
     });
 }

 function authmid(eapp) {
     var session = require('express-session');
     eapp.use(session({
         secret: process.env.SESSION_SECRET
     }));
     eapp.use(passport.initialize());
     eapp.use(passport.session());
 }

 module.exports.addMidware = authmid;
 module.exports.initStrategy = initStrategy;