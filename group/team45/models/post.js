/* User and request Models */

const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    user_id: String,
    username: String,
    date: String,
    time: String,
    content: String
});

const PostSchema = new mongoose.Schema({
    user_id: String,
    username: String,
    item: String,
    type: String,
    date: String,
    time: String,
    location: String,
    description: String,
    discussions: [DiscussionSchema]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };