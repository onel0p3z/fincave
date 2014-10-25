'use strict';

(function() {

    module.exports = {
        method: 'GET',
        path: '/{assets*}/{file*}',
        hanlder: {
            directory: {
                path: 'public'
            }
        }
    };
})();
