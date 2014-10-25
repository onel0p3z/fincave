'use strict';

(function() {

    module.exports = {
        method: 'GET',
        path: '/assets/{path*}',
        handler: {
            directory: {
                path: 'public',
                listing: false,
                index: false
            }
        }
    };
})();
