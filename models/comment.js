const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    body: String,
    author: String,
    created: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Comment", CommentSchema);