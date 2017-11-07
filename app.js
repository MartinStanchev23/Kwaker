var express = require('express');
var path = require('path');
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' })

var constants = require('./config/constants');
var middlewareSetup = require('./config/middleware');
var mongooseSetup = require('./config/mongoose');
var routes = require('./config/routes');

var logger = require('morgan');
var users = require('./routes/users');
var home = require('./routes/home');

var login = require('./routes/login');
var User = require('./models/user');
var Post = require('./models/post');
var Comment = require('./models/comment');
var Message = require('./models/message');
var Pic = require('./models/pic')



var app = express();

// initialize addtional Express middleware functions
middlewareSetup(app, constants);

// initialize Mongoose setup
var db = mongooseSetup(constants);

// initialize routes mapping
routes(app);

// set views directory path
app.set('views', path.join(__dirname, 'views'));

// set frontend code directory path
app.use(express.static(path.join(__dirname, 'public')));
//upload img
app.post('/', upload.any(), function (req, res, next) {
    console.log(req.files)
    var pic = new Pic();
    pic.address = req.files[0].filename + ".jpg";
    pic.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('./');
        }
    });


})
//add new user record in database "users"
app.post('/users', function (req, res) {
    var user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    user.phone = req.body.phone;
    console.log(user.firstname);
    user.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('user created');
        }
    });

});

//add new post record in database "posts"
// const users = db.model('User');


app.post('/posts', function (req, res) {
    var post = new Post();
    post.text = req.body.text;
    post.image = req.body.image;
    post.video = req.body.image;
    post.date = req.body.date;
    post.username = req.body.username;
    post.usernameId = req.body.usernameId;
    post.url = req.body.url;
    User.findOneAndUpdate({ 'username': post.username }, { $push: { 'posts': post } }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        // console.log(doc);
    });
    post.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('post created');
        }
    })
});
// app.post('/uploadPhoto', function(req, res){
//     var profilePicture = req.body.uploadPhoto;
//     var user = req.body.user;

//     User.findOneAndUpdate({'username': user.username}, {'url': profilePicture}, function(err, doc){
//         if(err){
//             console.log(err + 'picture upload failed')
//         } else {
//             console.log(doc)
//         }
//     })
// })

// var path = require('path'),
// fs = require('fs');
// // ...
// app.post('/upload', function (req, res) {
// var tempPath = req.files.file.path,
//     targetPath = path.resolve('./uploads/image.png');
// if (path.extname(req.files.file.name).toLowerCase() === '.png') {
//     fs.rename(tempPath, targetPath, function(err) {
//         if (err) throw err;
//         console.log("Upload completed!");
//     });
// } else {
//     fs.unlink(tempPath, function () {
//         if (err) throw err;
//         console.error("Only .png files are allowed!");
//     });
// }
// // ...
// });

// app.get('/image.png', function (req, res) {
//     res.sendfile(path.resolve('./uploads/image.png'));
// }); 

app.post('/sharePost', function (req, res) {
    var postToShare = req.body.post;
    var newPost = new Post();
    newPost.sharedText = '"' + postToShare.text + '"';;
    newPost.text = req.body.text
    newPost.image = postToShare.image;
    newPost.video = '';
    newPost.date = new Date();
    newPost.username = req.body.username;
    newPost.usernameId = req.body.usernameId;
    newPost.url = postToShare.url;
    User.findOneAndUpdate({ 'username': newPost.username }, { $push: { 'posts': newPost } }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        // console.log(doc);
    });
    newPost.save(function (err) {
        if (err) {
            res.send(err);
            console.log(err)
        } else {
            res.send('post shared');
        }
    })
});


app.post('/comments', function (req, res) {
    var comment = new Comment();
    comment.username = req.body.username;
    comment.url = req.body.url;
    comment.text = req.body.text;
    Post.findOneAndUpdate({ _id: req.body.postId }, { $push: { comments: comment } }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        // console.log(doc);
    });
    comment.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('comment created');
        }
    });
});

app.post('/user', function (req, res) {
    var message = new Message();
    message.text = req.body.messageText;
    message.usernameR = req.body.reciever;
    message.usernameS = req.body.username;
    User.findOneAndUpdate({ username: req.body.reciever }, { $push: { followers: message } }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        // console.log(doc);
    });
    message.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('message created');
        }
    });
})
app.post('/', function (req, res, next) {
    var id = req.body._id;
    var userId = req.body.userId;
    // console.log(id);
    // console.log(userId);

    Post.findOne({ _id: id }, function (err, post) {
        // console.log(post);
        if (err) {
            console.log(err)
        }

        post.likes = ((post.likes) + 1);

        post.save(function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('successfully updated')
            }
        });
    });

    User.findOneAndUpdate({ _id: userId }, { $push: { likes: id } }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        // console.log(doc);
    });
});

app.post('/m', function (req, res, next) {
    var id = req.body._id;
    var userId = req.body.userId;
    // console.log(id);
    // console.log(userId);

    Post.findOne({ _id: id }, function (err, post) {
        // console.log(post);
        if (err) {
            console.log(err)
        }
        post.likes = ((post.likes) + 1);

        post.save(function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('successfully updated')
            }
        });
    });

    User.findOneAndUpdate({ _id: userId }, { $pull: { likes: id } }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        // console.log(doc);
    });

});
app.post('/follow', function (req, res, next) {
    var userToFollow = req.body.userToFollow;
    var currentUser = req.body.currentUser;
    console.log(userToFollow)
    console.log(currentUser)
    if (userToFollow.followers.find(id => currentUser._id == id) != undefined &&
        currentUser.following.find(id => currentUser._id == id) != undefined) {
        User.findOneAndUpdate({ _id: userToFollow._id }, { $push: { followers: currentUser._id } }, function (err, doc) {
            if (err) {
                console.log(err);
            }
            user.save(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('successfully followed')
                }
            });
            // console.log(doc);
        });
        User.findOneAndUpdate({ _id: currentUser._id }, { $push: { following: userToFollow._id } }, function (err, doc) {
            if (err) {
                console.log(err);
            }
            // console.log(doc);
            user.save(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('successfully followed 2')
                }
            });
        });
    }

})

app.post('/unfollow', function (req, res, next) {
    var userToFollow = req.body.userToFollow;
    var currentUser = req.body.currentUser;
    if (userToFollow.followers.find(id => currentUser._id == id) != undefined &&
        currentUser.following.find(id => currentUser._id == id) != undefined) {
        User.findOneAndUpdate({ _id: userToFollow._id }, { $pull: { followers: currentUser._id } }, function (err, doc) {
            if (err) {
                console.log(err);
            }
            user.save(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('successfully unfollowed')
                }
            });
            // console.log(doc);
        });
        User.findOneAndUpdate({ _id: currentUser._id }, { $pull: { following: userToFollow._id } }, function (err, doc) {
            if (err) {
                console.log(err);
            }
            // console.log(doc);
            user.save(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('successfully unfollowed 2')
                }
            });
        });
    }
})
module.exports = app;
