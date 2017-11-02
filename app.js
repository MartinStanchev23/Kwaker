var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/homeJS');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();
var login = require('./routes/login');
var mongo = require('mongodb');
var Promise = require('mpromise');
var User = require('./models/user');
var Post = require('./models/post');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportConfig = require('./routes/passport');
var session = require('express-session');




//mongoose set up
mongoose.connect('mongodb://localhost:27017/kwakerdb');
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
  console.log(req.body);
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
  if (req.body.other) {
    post.other = req.body.other;
  }
  post.authorId = req.body.authorId;
  post.username = req.body.username;
  db.collection('users').update({ 'username': post.username }, { $push: { 'posts': post } });
  post.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send('post created');
    }
  })
})

// Passport setup
// console.log(passportConfig());
// app.post('/login', function (req, res) {
//   var email = req.body.email;
//   var password = req.body.password;
// });
app.post('/login', function (req, res, next) {

  // var users = db.getCollection('users');
  // console.log(users);
  var email = req.body.email;
  var password = req.body.password;
  var activeUser;

  db.collection('users').findOne({ email: req.body.email }, function (err, user) {
   
    if (user != null) {
      res.send({success: true});
      // set to true
    } else {
      res.send({success: false});
      // set to false
    }
  });
});

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
app.use('/#!/home', home);
// app.use('/login', login);

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
