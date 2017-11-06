var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var express = require('express');

module.exports = function (app, constants) {
    app.set('view engine', 'hbs');
    // use handlebars and set views and static directories
    // app.set('views', path.join(__dirname, 'views'));
    //add middlewares
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(session(constants.sessionSecret));
    app.use(cookieParser());

    //app.use(favicon(path.join(constants.root, 'client/src/favicon.ico')));

    // general errors
    app.use(function (err, req, res, next) {
        const sc = err.status || 500;
        res.status(sc);
        res.render('../views/error', {
            error: {
                status: sc,
                message: err.message,
                stack: constants.env === 'development' ? err.stack : ''
            }
        });
    });
};
