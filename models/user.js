var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    firstname: { type: String, required: true, minlength: 1 },
    url: { type: String, default: "http://free-icon-download.com/modules/PDdownloads/images/screenshots/free-icon-download-rubber-duck-illustration.png" },
    lastname: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, lowercase: true, unique: true },
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    followers: { type: Array },
    following: { type: Array },
    phone: { type: String, required: true, unique: true },
    age: { type: String },
    gender: { type: String },
    posts: { type: Array },
    likes: { type: Array }
});

//encrypting password
// UserSchema.pre('save', function (next) {
//     var user = this;
//     bcrypt.hash(user.password, null, null, function (err, hash) {
//         if (err) {
//             return next();
//         }
//         user.password = hash;
//         next();
//     })
// })

module.exports = mongoose.model('User', UserSchema);