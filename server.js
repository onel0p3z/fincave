'use strict';

(function () {
    var Hapi = require('hapi');
    var routes = require('./routes/');
    var path = require('path');
    var options = {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    };

    var server = module.exports = new Hapi.Server(
        process.env.HOST || 'localhost',
        process.env.PORT || '8080',
        options || {}
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
