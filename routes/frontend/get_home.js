(function() {
    'use strict';

    function getHomeHandler (request, reply) {
        reply.view('home', {
            title: 'Home'
        });
    }

    module.exports = {
        path: '/',
        method: 'GET',
        handler: getHomeHandler
    };
})();
