var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://zarina:123456789@ds145275.mlab.com:45275/kwakerdb');
var db = mongoose.connection;
/* GET users listing. */
router.get('/', function (req, res, next) {
    // var db = req.db;
    //  console.log(db);
    var db = mongoose.connection;
    // console.log(db);
    var posts = db.collection('posts');
    // console.log(posts);
    db.collection('posts').find({}).toArray(function (err, data) {
        res.json(data);
    })
});


module.exports = router;