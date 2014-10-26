'use strict';

(function() {
    var Hapi = require('hapi');

    function postEventHandler(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var response = {};
        console.log('Request:', request.payload);
        db.collection('events').insert(JSON.parse(request.payload), function(error, data) {
            if(error) {
                console.log(error);
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
