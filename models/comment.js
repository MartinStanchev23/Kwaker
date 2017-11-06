var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    username: { type: String },
    url: {type: String},
    text: { type: String, minlength: 1, maxlength: 140 },
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', CommentSchema);