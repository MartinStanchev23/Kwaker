var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    text: {type: String},
    usernameR: {type: String},
    usernameS: {type: String}
});

module.exports = mongoose.model('Message', MessageSchema);