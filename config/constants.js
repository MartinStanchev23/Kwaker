var path = require('path');

module.exports = {
    db: process.env.MONGOURI || 'mongodb://zarina:123456789@ds145275.mlab.com:45275/kwakerdb',
    // environment
    // port on which to listen
    port: process.env.PORT || 3030,

    // environment
    env: process.env.NODE_ENV || 'development',

    sessionSecret: {secret: "quacker"}
};
