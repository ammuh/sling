var mongoose = require('mongoose');

module.exports = {
    users: mongoose.model('Users', new mongoose.Schema({
        username: { type: [String], index: true },
        email: String,
        password: String
    }, {
        collection: 'Users'
    }))
}