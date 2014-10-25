'use strict';

(function() {
    function getInstagramUsersHandler (request, reply) {
        console.log('PAYLOAD', request.query);

        reply(request.query['hub.challenge']);
    }


    module.exports = {
        path: '/instagram/users',
        method: 'GET',
        handler: getInstagramUsersHandler
    };
})();
