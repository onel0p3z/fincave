'use strict';

(function() {
    function postInstragramUsersHandler (request, reply) {
        var incoming;
        try {
            incoming = JSON.parse(request.payload);
            console.log('INCOMING', incoming);
        } catch (e) {
            console.error(e);
        }

        reply({
            status: 'ok',
            message: 'Thank you :D'
        });
    }

    module.exports = {
        path: '/instagram/users',
        method: 'POST',
        handler: postInstragramUsersHandler
    };
})();
