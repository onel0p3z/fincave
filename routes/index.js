'use strict';

(function() {
    var get_instagram = require('./get_instagram');
    var post_instagram = require('./post_instagram');

    module.exports = [
        get_instagram,
        post_instagram
    ];
})();
