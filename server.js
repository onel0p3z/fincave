(function () {
    'use strict';

    var Hapi = require('hapi');
    var routes = require('./routes/');
    var path = require('path');
    var config = require('./config');
    var inspect = require('util').inspect;
    var insobj = { depth: 10, colors: true };
    //var SocketIO = require('socket.io');

    console.log(inspect(config, insobj));

    var options = {
        views: {
            path: path.join(__dirname,  'templates'),
            engines: {
                html: require('swig')
            }
        }
    };

    var server = module.exports = new Hapi.Server(
        config.host || 'localhost',
        config.port || '8080'
    );

    server.views(options.views);

    var mongodb_config = {
        plugin: require('hapi-mongodb'),
        options: {
            url: config.mongo_uri || 'mongodb://localhost/fincave',
            options: {
                db: {
                    native_parser: true
                }
            }
        }
    };

    server.pack.register(mongodb_config, function (err) {
        if (err) { throw new Error(err); }
    });

    /*
    var good_config = {
        plugins: require('good'),
        options: {
            subscribers: {
                console: ['ops', 'request', 'log', 'error']
            }
        }
    };

    server.pack.register(good_config, function (err) {
        if (err) { throw new Error(err); }
    });
    */

    server.route(routes);

    server.start(function(){
        console.log(
            '['+new Date().toISOString()+'] Server running at:',
            server.info.uri
        );
        //var io = SocketIO.listen(server.listener);

		require('./scripts/twitter_stream');
    });
})();

