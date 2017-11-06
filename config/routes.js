var apiUsers = require('../routes/apiUsers');
var apiPosts = require('../routes/apiPosts');
var apiComments = require('../routes/apiComments');
var login = require('../routes/login')

module.exports = function (app) {
    app.use('/api', apiUsers);
    app.use('/api/posts', apiPosts);
    app.use('/api/comments', apiComments);
    app.use('/login', login);

// app.get("*",function(req,res){
//   res.sendFile(path.join(__dirname + '/public/kwaker.html'));
// });

    // app.use('/users', users);
    // app.use('/home', home);
    // app.use('/login', login);
};