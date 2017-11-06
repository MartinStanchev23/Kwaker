var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var connected = false;
// var activeUser = null;
// console.log(activeUser)
// router.get('/', function (req, res, next) {
//     console.log(activeUser)
//     if (activeUser != null) {
//         res.redirect('/')
//     } else {
//         console.log(activeUser)
//     }
// })

router.post('/', function (req, res, next) {
    // var users = db.getCollection('users');
    // console.log(users);
    connected = false;
    var email = req.body.email;
    var password = req.body.password;
    db.collection('users').findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (user !== null && !connected ) {
            res.json(user);
            connected = true;
            // set to true
        } else {
            res.json({ success: false });
            // set to false
        }
    });
});

module.exports = router;