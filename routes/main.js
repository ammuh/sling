var express = require('express');
var router = express.Router();
var sling = require('../sling/main');
var auth = require('../sling/auth');

router.get('/', function(req, res) {
    res.send('Hello World');
});

router.route('/login')
    .get(function(req, res) {
        res.send("Post to login.");
    })
    .post(auth.loginMidware('/', '/login'));

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