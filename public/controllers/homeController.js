//    //home controller
//    var express = require('express');
//    var router = express.Router();
//    var mongoose = require('mongoose');
//    var db = mongoose.connection;

//    var post = db.collection('posts');
//    console.log(post);
addEventListener('DOMContentLoad', function () {

    var dropMenu = document.getElementById('navProfile');
    var profilePic = document.getElementById('navProfilePic');
    
    profilePic.addEventListener('click', function(){
        dropMenu.style.display = 'inline-block';
    })
})
