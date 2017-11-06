var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    text: {type: String, maxlength: 140},
    sharedText: {type: String, maxlength: 140},
    image: {type: String},
    video: {type: String},
    date: {type: Date, default: Date.now},
    usernameId: {type: String},
    likes: {type: Number, default: 0},
    shares: {type: Number, default: 0},
    username: {type: String},
    comments: {type: Array},
});

module.exports = mongoose.model('Post', PostSchema);