var express = require('express');
var router = express.Router();
var sling = require('../sling/main');
var auth = require('../sling/auth');

router.get('/', function(req, res) {
    res.send('Hello World');
});

router.get('/loggedOut', function(req, res) {
    res.send('You have been logged out');
})

router.route('/login')
    .get(function(req, res) {
        console.log("Login reached");
        res.render('login');
    })
    .post(auth.loginMidware('/', '/login'));

router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) throw err;
        res.redirect('/loggedOut');
    });
})

router.post('/signUp', function(req, res) {
    sling.createUser(req.body, function(err) {
        if (err) {
            res.status(403);
            res.send({
                message: err.message
            });
        } else {
            res.send({
                message: "User Created Successfully"
            });
        }
    });
});

module.exports = router;