var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var router = express.Router();
var mongoose = require('mongoose');

var login = require('./routes/login');
var mongo = require('mongodb');
var Promise = require('mpromise');
var User = require('./models/user');
var Post = require('./models/post');
var Comment = require('./models/comment');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportConfig = require('./routes/passport');
var session = require('express-session');
var apiUsers = require('./routes/apiUsers');
var apiPosts = require('./routes/apiPosts');
var apiComments = require('./routes/apiComments');


var app = express();



//mongoose set up
mongoose.connect('mongodb://zarina:123456789@ds145275.mlab.com:45275/kwakerdb');
var db = mongoose.connection;
db.on('open', function (err) {
  if (err) {
    console.log('Database connot be opened ' + err);
  }
  console.log('Database up and running');
})
db.on('error', function (err) {
  console.log('Database error: ' + err);
});

app.use(session({ secret: "quacker" }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// function checkLogin(req, res, next) {
//   if (req.session.userId) {
//     next();
//   } else {
//     res.redirect('./#!/login');
//   }
// }

app.use(express.static(path.join(__dirname, 'public')));

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
var users = db.collection('users');


app.post('/posts', function (req, res) {
  var post = new Post();
  post.text = req.body.text;
  post.image = req.body.image;
  post.video = req.body.image;
  post.date = req.body.date;
  post.username = req.body.username;
  post.usernameId = req.body.usernameId;
  post.url = req.body.url;
  db.collection('users').update({ 'username': post.username }, { $push: { 'posts': post } });
  post.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send('post created');
    }
  })
})
app.post('/sharePost', function (req, res) {
  var postToShare = req.body.post; 
  console.log(postToShare)
  var newPost = new Post();
  newPost.sharedText = postToShare.text;
  newPost.text = req.body.text;
  newPost.image = postToShare.image;
  newPost.video = '';
  newPost.date = new Date()
  newPost.username = req.body.username;
  newPost.usernameId = req.body.usernameId;
  newPost.url = postToShare.url;
  console.log('az sym tuk' + newPost)
  db.collection('users').update({ 'username': newPost.username }, { $push: { 'posts': newPost } });
  newPost.save(function (err) {
    if (err) {
      res.send(err);
      console.log(err)
    } else {
      res.send('post shared');
    }
  })
})


app.post('/comments', function (req, res) {
  var comment = new Comment();
  comment.username = req.body.username;
  comment.url = req.body.url;
  comment.text = req.body.text;
  Post.findOneAndUpdate({ _id: req.body.postId }, { $push: { comments: comment } }, function (err, doc) {
    if (err) {
      console.log(err);
    }
    console.log(doc);
  });
  comment.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send('comment created');
    }
  });
});

app.post('/', function (req, res, next) {
  var id = req.body._id;
  var userId = req.body.userId;
  console.log(id);
  console.log(userId);

  Post.findOne({ _id: id }, function (err, post) {
    console.log(post);
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
    console.log(doc);
  });

});

app.use(function (req, res, next) {
  req.db = db;
  next();
});

// });
// Passport setup
// console.log(passportConfig());
// app.post('/login', function (req, res) {
//   var email = req.body.email;
//   var password = req.body.password;
// });


app.use('/api', apiUsers);
app.use('/api/posts', apiPosts);
app.use('/api/comments', apiComments);


// app.get("*",function(req,res){
//   res.sendFile(path.join(__dirname + '/public/kwaker.html'));
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use('/', index);

// app.use('/users', users);
app.use('/home', home);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
