var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PicSchema = new Schema({
    address: { type: String }
});

module.exports = mongoose.model('Pic', PicSchema);