 var passport = require('passport');
 var LocalStrategy = require('passport-local').Strategy;
 var mongoose = require('mongoose');
 var session = require('express-session');
 var bcrypt = require('bcrypt');

 function initStrategy() {
     var users = mongoose.model('Users');
     passport.use(new LocalStrategy(
         function(username, password, done) {
             User.findOne({ username: username }, function(err, user) {
                 if (err) { return done(err); }
                 if (!user) {
                     return done(null, false, { message: 'Incorrect username.' });
                 }
                 if (compare(password, user.password)) {
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
     eapp.use(session({
         secret: process.env.SESSION_SECRET
     }));
     eapp.use(passport.initialize());
     eapp.use(passport.session());
 }

 function comparePass(pass, hash) {
     return bcrypt.compareSync(pass, hash);
 }

 function genHash(pass) {
     return bcrypt.hashSync(pass, 10);
 }

 module.exports.addMidware = authmid;
 module.exports.initStrategy = initStrategy;

 module.exports.comparePass = comparePass;

 module.exports.genHash = genHash;