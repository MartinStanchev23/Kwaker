var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var activeUser = null;
console.log(activeUser)
router.get('/', function (req, res, next) {
    console.log(activeUser)
    if (activeUser != null) {
        res.redirect('/')
    } else {
        console.log(activeUser)
    }
})

router.post('/', function (req, res, next) {

    // var users = db.getCollection('users');
    // console.log(users);
    var email = req.body.email;
    var password = req.body.password;
    activeUser = { email: email, password: password };
    db.collection('users').findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (user != null) {
            res.json(user);
            // set to true
        } else {
            res.json({ success: false });
            // set to false
        }
    });
});

module.exports = router;