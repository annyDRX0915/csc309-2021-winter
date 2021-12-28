/* User and request Models */

const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    status: String,
    description: String,
    uesr: Number
});

// Request will be embedded in the User model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    founds: [String],
    posts: [String],
    requests: [RequestSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
