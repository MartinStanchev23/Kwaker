var mongoose = require('mongoose');

module.exports = function(constants) {
    // MONGOOSE SET-UP
    // warn if MONGOURI is being used and pass is undefined
    if (constants.db === process.env.MONGOURI && !constants.pass)
        logger.warn('Bad credentials for ' + constants.db + ' -- check env.');

    mongoose.connect(constants.db);
    //     , {
    //     user: constants.user,
    //     pass: constants.pass
    // });

    const db = mongoose.connection;
    db.on('error', function () {
        throw new Error('Unable to connect to database at ' + constants.db);
    });

    return db;
};