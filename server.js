'use strict';

(function () {
    var Hapi = require('hapi');
    var routes = require('./routes/');
    var path = require('path');

    var options = {
        views: {
            engines: {
                html: require('swig')
            },
            path: path.join(__dirname,  '/templates')
        }
    };

    var server = module.exports = new Hapi.Server(
        process.env.HOST || 'localhost',
        process.env.PORT || '8080',
        options || {}
    );

    var mongodb_config = {
        plugin: require('hapi-mongodb'),
        options: {
            url: process.env.MONGO_URI || 'mongodb://localhost/fincave',
            options: {
                db: {
                    native_parser: true
                }
            }
        }
    };

    var good_config = {
        subscribers: {
            console: ['ops', 'request', 'log', 'error']
        }
    };

    server.pack.register([
        mongodb_config,
        good_config
        ], function (err) {
            if (err) { throw new Error(err); }
    });

    server.route(routes);

    server.start(function(){
        console.log('/****************/');
        console.log(new Date().toISOString());
        console.log('/****************/');
        console.log('Server running at:', server.info.uri);
    });
})();
