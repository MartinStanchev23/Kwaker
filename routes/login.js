var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;

router.post('/login', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email);
    var users = db.getCollection('users');
    console.log(users);
    db.getCollection('users').find({ email: email, password: password }, function(e, docs) {
        if (docs != null && docs.length > 0) {
            req.session.userId = docs[0]._id;
            res.redirect("/");
        } else {
            res.redirect("htm/login.htm");
        }
    });
});

module.exports = router;