var express = require('express');
var router = express.Router();
var sling = require('../sling/main');

router.get('/', function(req, res) {
    res.send('Hello World');
});

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