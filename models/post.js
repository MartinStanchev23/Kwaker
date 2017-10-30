var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    text: {type: String, minlength: 1, maxlength: 140},
    other: {type: String},
    authorId: {type: String},
    likes: {type: Number},
    date:{type: Date, default: Date.now},
    username:{type: String}
})

module.exports = mongoose.model('Post', PostSchema);