var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    text: {type: String, minlength: 1, maxlength: 140},
    image: {type: String},
    video: {type: String},    
    date:{type: Date, default: Date.now},
    usernameId: {type: String},
    likes: {type: Number},
    username:{type: String},
    comments: {type: Array},
    url: {type: String}
})

module.exports = mongoose.model('Post', PostSchema);