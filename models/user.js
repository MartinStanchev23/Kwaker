var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
});

//encrypting password
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next();
        user.password = hash;
        next();
    })
})

module.exports = mongoose.model('User', UserSchema);