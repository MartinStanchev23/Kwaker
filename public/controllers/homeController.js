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
            isDropingMenuOn = false;
        }
    })
    var postInput = document.getElementById('postInput');
    document.addEventListener('load', function () {
        postInput.addEventListener('focus', function () {
            postInput.style.height += 50 + 'px';

        })
    })
    if (sessionStorage.length == 0) {
        document.getElementById('mainNav').style.display = 'none';
    } else {
        document.getElementById('mainNav').style.display = 'block';

    }
})


appNG.controller('homeController', function ($scope, $http, $location) {
    if (user == null) {
        user = JSON.parse(sessionStorage.getItem('user'))
        console.log(user)
    }
    if (user != null) {
        $scope.profilePicture = user.url;
        $scope.username = user.username
        $scope.numberOfKwaks = user.posts.length;
        $scope.numberOfFollowing = user.following.length
        $scope.numberOfFollowers = user.followers.length;
        document.getElementById('mainNav').style.display = 'block';

        $scope.group1 = '#group'
        $scope.group2 = '#group'
        $scope.group3 = '#group'
        $scope.group4 = '#group'
        $scope.group5 = '#group'
    } else if (sessionStorage.length == 0) {
        alert('Log in first')
        $location.path('/login')
    }
    $http.get("./api/posts").then(function (posts) {
        posts.data = posts.data.reverse();
        $scope.posts = posts.data;
    })

    $scope.showShares = false;
    $scope.hideShare = function (index) {
        la = index;
        $scope.showShares = false;        
    }
    var la;
    $scope.showShare = function (index) {
        la = index;
        $scope.showShares = true;
    }
    $scope.shareP = function (ind) {
        if( la == ind && $scope.showShares){
            return true;
        } else {
            return false;
        }
    }
    $scope.share = function (post) {
        $scope.showShareForm = true;
        $scope.username = user.username;
        $scope.usernameId = user._id;
        $scope.description = '';
        $scope.post = post;
        
        $http.post('/sharePost', JSON.stringify({
            post: $scope.post, text: $scope.description, username: $scope.username,
            usernameId: $scope.usernameId
        }))
    }
    $scope.showImg = function (post) {
        if (post.image !== undefined) {
            return true;
        }
        return false;
    }
    $scope.showVideo = function (post) {
        if (post.video.length > 0) {
            return true;
        }
        return false;
    }
})




