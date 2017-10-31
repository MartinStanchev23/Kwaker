var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');

var User = require('../models/user');

// var userLogin = function (email, password) {
//     passport.use(new LocalStrategy((email, password, done) => {
//         User.findOne({ email: email }).exec((err, user) => {
//             if (err) {
//                 console.log('Error loading user: ' + err);
//                 return;
//             }

//             if (user && user.authenticate(password)) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//             }
//         });
//     }));
// }

// module.exports = userLogin();
