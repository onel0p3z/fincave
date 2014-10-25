'use strict';
(function() {

    function getHomeHandler (request, reply) {
        reply('You get at our Home.');
    }

    module.exports = {
        path: '/',
        method: 'GET',
        handler: getHomeHandler
    };
})();
