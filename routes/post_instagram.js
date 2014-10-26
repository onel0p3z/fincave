'use strict';

(function() {
    function postInstragramUsersHandler (request, reply) {
        //var Hapi = require('hapi');
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

        instagram(db);

        /*
        db.collection('entries').insert(incoming, function (err, result) {
            if (err) {
                console.error('SAVING_EVENT_ERROR', err);
            }
            console.log('RESULT', result);
        });
        */
    }

    module.exports = {
        path: '/instagram/users',
        method: 'POST',
        handler: postInstragramUsersHandler
    };
})();
