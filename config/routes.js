var apiUsers = require('../routes/apiUsers');
var apiPosts = require('../routes/apiPosts');
var apiComments = require('../routes/apiComments');
<<<<<<< HEAD
var login = require('../routes/login');
=======
var login = require('../routes/login')
>>>>>>> c3311c89599192a0d36ac0c514b6acb47732d5fc

module.exports = function (app) {
    app.use('/api', apiUsers);
    app.use('/api/posts', apiPosts);
    app.use('/api/comments', apiComments);
<<<<<<< HEAD
    app.use('/login', login)
=======
    app.use('/login', login);

>>>>>>> c3311c89599192a0d36ac0c514b6acb47732d5fc
// app.get("*",function(req,res){
//   res.sendFile(path.join(__dirname + '/public/kwaker.html'));
// });

    // app.use('/users', users);
    // app.use('/home', home);
    // app.use('/login', login);
};