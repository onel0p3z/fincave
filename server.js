'use strict';

(function () {
    var Hapi = require('hapi');
    var routes = require('./routes/');
    var config = require('./common/config');

    config.startEnvironment();

    var server = module.exports = new Hapi.Server(
        process.env.API_HOST,
        process.env.API_PORT,
        config.server
    );

    server.pack.register(require('good'), function (err) {
        if (err) {
            throw new Error(err);
        }
    });

    server.route(routes);

    server.start(function(){
        console.log('/****************/');
        console.log(new Date().toISOString());
        console.log('/****************/');
        console.log('Server running at:', server.info.uri);
    });
})();
