'use strict';

(function() {
    function postInstragramUsersHandler (request, reply) {
        //var Hapi = require('hapi');
        var incoming;
        var db = request.server.plugins['hapi-mongodb'].db;

        try {
            incoming = request.payload;
            console.log('INCOMING', JSON.stringify(incoming));
        } catch (e) {
            console.error(e);
        }

        console.log('saving incoming entry', incoming);

        db.collection('entries').insert(incoming, function (err, result) {
            if (err) {
                console.error('SAVING_EVENT_ERROR', err);
            }

            console.log('RESULT', result);

            reply({
                status: 'ok',
                message: 'Thank you :D'
            });
        });

    }

    module.exports = {
        path: '/instagram/users',
        method: 'POST',
        handler: postInstragramUsersHandler
    };
})();
