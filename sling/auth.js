 var passport = require('passport');
 var LocalStrategy = require('passport-local').Strategy;
 var mongoose = require('mongoose');
 var session = require('express-session');
 var bcrypt = require('bcrypt');

 function initStrategy() {
     var users = mongoose.model('Users');
     passport.use(new LocalStrategy(
         function(username, password, done) {
             users.findOne({ username: username }, function(err, user) {
                 if (err) { return done(err); }
                 if (!user) {
                     return done(null, false, { message: 'Incorrect username.' });
                 }
                 if (comparePass(password, user.password)) {
                     return done(null, user);
                 } else {
                     return done(null, false, { message: 'Incorrect password.' });
                 }

             });
         }));

     passport.serializeUser(function(user, done) {
         console.log("Serialized User");
         done(null, user.id);
     });

     passport.deserializeUser(function(id, done) {
         console.log("DeSerialized User");
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

 function genHash(pass) {
     return bcrypt.hashSync(pass, 10);
 }

 function comparePass(pass, hash) {
     return bcrypt.compareSync(pass, hash);
 }

 function loginMidware(success, failure) {
     return passport.authenticate('local', {
         successRedirect: success,
         failureRedirect: failure
     });
 }
 module.exports.loginMidware = loginMidware;
 module.exports.addMidware = authmid;
 module.exports.initStrategy = initStrategy;

 module.exports.comparePass = comparePass;

 module.exports.genHash = genHash;