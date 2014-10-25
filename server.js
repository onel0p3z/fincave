'use strict';

(function () {
    var Hapi = require('hapi');
    var routes = require('./routes/');


    var server = module.exports = new Hapi.Server(
        process.env.HOST || '0.0.0.0',
        process.env.PORT || '8080',
        process.env.APP_OPTS || {}
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
