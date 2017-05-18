var mongoose = require('mongoose');

module.exports = {
    users: mongoose.model('Users', new mongoose.Schema({
        username: String,
        email: String,
        password: String
    }, {
        collection: 'Users'
    }))
}