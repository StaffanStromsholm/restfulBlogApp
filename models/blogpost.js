const mongoose = require('mongoose');
const Comment = require('./comment');

var BlogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
    body: String,
    created: {type: Date, default: Date.now},
    
})

module.exports = mongoose.model("Blog", BlogSchema)