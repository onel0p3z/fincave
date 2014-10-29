(function() {
    'use strict';

    function postInstragramUsersHandler (request, reply) {
        var incoming;
        var db = request.server.plugins['hapi-mongodb'].db;
        var instagram = require('../scripts/instagram_stream.js');

        try {
            incoming = request.payload;
            console.log('INCOMING', JSON.stringify(incoming));
        } catch (e) {
            console.error(e);
        }

        console.log('saving incoming entry', incoming);

        reply({
            status: 'ok',
            message: 'Thank you :D'
        });

        console.log('starting instagram processing');
        instagram(db);
    }

    module.exports = {
        path: '/instagram/users',
        method: 'POST',
        handler: postInstragramUsersHandler
    };
})();
