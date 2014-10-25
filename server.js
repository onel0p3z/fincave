'use strict';

(function () {
    var Hapi = require('hapi');
    var routes = require('./routes/');

    var options = {
        views: {
            engines: { jade: require('jade') },
            path: __dirname + '/templates',
            compileOptions: {
                pretty: true
            }
        }
    };

    var server = module.exports = new Hapi.Server(
        process.env.HOST || 'localhost',
        process.env.PORT || '8080',
        options || {}
    );

    var dbObj = {
        url: process.env.MONGO_URI || 'mongodb://localhost/fincave',
        options: {
            db: {
                native_parser: true
            }
        }
    };

    var registerObj = {
        plugin: require('hapi-mongodb'),
        options: dbObj
    };

    server.pack.register(registerObj, function (err) {
        if (err) {
            throw new Error(err);
        }
    });

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
