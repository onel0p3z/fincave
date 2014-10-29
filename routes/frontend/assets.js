(function() {
    'use strict';

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
