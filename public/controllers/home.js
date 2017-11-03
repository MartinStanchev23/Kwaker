//    //home controller
//    var express = require('express');
//    var router = express.Router();
//    var mongoose = require('mongoose');
//    var db = mongoose.connection;

//    var post = db.collection('posts');
//    console.log(post);
document.addEventListener('DOMContentLoaded', function () {

    var dropMenu = document.getElementById('navProfile');
    var profilePic = document.getElementById('navProfilePic');
    var isDropingMenuOn = false;
    profilePic.addEventListener('click', function () {
        if (!isDropingMenuOn) {
            dropMenu.style.display = 'inline-block';
            isDropingMenuOn = true;
        } else {
            dropMenu.style.display = 'none';
            isDropingMenuOn = false ;
        } 
    })
    var postInput = document.getElementById('postInput');
    document.addEventListener('load', function () {
        postInput.addEventListener('focus', function () {
            postInput.style.height += 50 + 'px';

        })
    })

})




