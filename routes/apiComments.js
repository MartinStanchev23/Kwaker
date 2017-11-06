var express = require('express');
var router = express.Router();

module.exports = function (db) {
    /* GET users listing. */
    router.get('/', function (req, res, next) {
        var comments = db.collection('comments');
        console.log(comments);
        db.collection('comments').find({}).toArray(function (err, data) {
            res.json(data);
        })
    });
};