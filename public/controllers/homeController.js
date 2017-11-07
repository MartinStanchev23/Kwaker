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


})



appNG.controller('homeController', function ($scope, $http, $location) {
    if (user == null) {
        user = JSON.parse(sessionStorage.getItem('user'))
        console.log(user);
    }
    if (user != null) {
        $scope.profilePicture = user.url;
        $scope.username = user.username
        $scope.numberOfKwaks = user.posts.length;
        $scope.numberOfFollowing = user.following.length
        $scope.numberOfFollowers = user.followers.length;
        document.getElementById('mainNav').style.display = 'block';
        // $scope.description = description;

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

    $http.get("/api/pics").then(function (pics) {
       console.log(pics.data)
    var reversePics = pics.data.reverse();
    var firstPic = reversePics[0];
    console.log(firstPic);
    var user = JSON.parse(sessionStorage.getItem('user'));
    user.url = firstPic.address;
    var base64 = firstPic.address;
    // var buf = new Buffer(base64, 'base64'); // Ta-da
    console.log(buf);
    console.log(user.url)
    sessionStorage.setItem('user', JSON.stringify(user));
    
    
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
        if (la == ind && $scope.showShares) {
            return true;
        } else {
            return false;
        }
    }

    // $scope.sendData = function () {
    //     var formData = $scope.file;
    //     var user = JSON.parse(sessionStorage.getItem('user'));

    //     $http({
    //         method: 'POST',
    //         url: '/uploadFile',
    //         user: user,
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //         data: formData,
    //         transformRequest: function (data, headersGetterFunction) {
    //             return data; // do nothing! FormData is very good!
    //         },
    //     }).then(function (response) {
    //         console.log(response);
    //     });
    // }
    $scope.getProfile = function () {
        $location.path('/profile')
    }
    $scope.showUser = function (user) {
        console.log(user);
        $location.path('/user')
        var person = user;
        sessionStorage.setItem('person', JSON.stringify(person));
    }
    $scope.postData = {};
    $scope.share = function (post) {
        $scope.showShareForm = true;
        $scope.username = user.username;
        $scope.usernameId = user._id;
        $scope.post = post;

        console.log($scope.newText)
        $http.post('/sharePost', JSON.stringify({
            post: $scope.post, text: $scope.postData.description, username: $scope.username,
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
    $scope.plusOneLike = function (postId) {
        var _id = postId;
        var user = JSON.parse(sessionStorage.getItem('user'));
        var userId = JSON.parse(sessionStorage.getItem('user'))._id;
        var userLikes = JSON.parse(sessionStorage.getItem('user')).likes;

        if (!(user.likes.find(x => x != _id))) {
            $http.post('/', JSON.stringify({
                _id: postId, userId: userId
            }))
            user.likes.push(postId)
            sessionStorage.setItem('user', JSON.stringify(user))
        } else {
            if ((user.likes.find(x => x == _id))) {
                console.log('eeeee laikna go veche, ne moje pak');
                var index = user.likes.indexOf(postId);
                user.likes.splice(index, 1);
                sessionStorage.setItem('user', JSON.stringify(user))
                $http.post('/m', JSON.stringify({
                    _id: postId, userId: userId
                }))
            }
        }
        (function () {
            location.reload();
        })();

    }
    $scope.showAllUsers = function () {
        $http.get('/api').then(function (res) {
            console.log(res.data);
            $scope.users = res.data;
        })

    }
    //    COMMENTS
    $scope.commentData = {};
    $scope.submitReplay = function (post, textt) {
        var postId = post._id;
        var username = JSON.parse(sessionStorage.getItem('user')).username;
        var url = JSON.parse(sessionStorage.getItem('user')).url;

        $http.post('/comments', JSON.stringify({
            username: username, url: url,
            text: $scope.commentData.comm, postId: postId
        })).then(function () {
            location.reload();
        })
    }
})




