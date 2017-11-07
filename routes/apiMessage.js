var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongo = require('mongodb');
mongoose.connect('mongodb://zarina:123456789@ds145275.mlab.com:45275/kwakerdb');
var db = mongoose.connection;
    /* GET users listing. */
    router.get('/', function (req, res, next) {
        var messages = db.collection('messages');
        // console.log(comments);
        db.collection('messages').find({}).toArray(function (err, data) {
            res.json(data);
        })
    });
module.exports = router;