var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var users = db.collection('users');
/* GET home page. */
router.get('/', function (req, res, next) {
    users.find(), function (err, user) {
        if (err) {
            console.log(err)
        } else {
            res.json(user);
            console.log(user);
            res.send(user)
        }
    }
});

module.exports = router;