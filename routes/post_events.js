'use strict';

(function() {
    var Hapi = require('hapi');

    function postEventHandler(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var response = {};
        db.collection('events').insert(request.payload, function(error, data) {
            if(error) {
                response = Hapi.error.internal('error in database', error);
            } else {
                response = data;
            }

            return reply(response);
        });
    }

    module.exports = {
        path: '/events',
        method: 'POST',
        handler: postEventHandler
    };
})();
