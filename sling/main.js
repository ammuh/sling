var mongoose = require('mongoose');
var users = mongoose.model('Users');
var auth = require('./auth');
mongoose.Promise = global.Promise;

function createUser(data, callback) {
    users.findOne({
            username: data.username
        }).exec()
        .then(function(user) {
            if (user) {
                throw new Error("User already exists.");
            }
            return Promise.resolve();
        })
        .then(function() {
            var user = new users({
                username: data.username,
                email: data.email,
                password: auth.genHash(data.password)
            });
            user.save(callback);
        })
        .catch(function(err) {
            callback(err);
        });

}

module.exports.createUser = createUser;