var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');


mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds137435.mlab.com:37435/movieworld');
var db = mongoose.connection;
// module.exports = function (router) {
    // console.log(router);
    // router.post('/users', function (req, res) {
    //     var user = new User();
    //     user.firstname = req.body.firstname;
    //     user.lastname = req.body.lastname;
    //     user.email = req.body.email;
    //     user.username = req.body.username;
    //     user.password = req.body.password;
    //     console.log(user.firstname);
    //     user.save(function (err) {
    //         if (err) {
    //             res.send('Username or Email already exists!');
    //         } else {
    //             res.send('User Created');
    //         }
    //     });

    // });
    // return router; // returnva go kum servera

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
