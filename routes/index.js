'use strict';

(function() {
    var get_instagram = require('./get_instagram');
    var post_instagram = require('./post_instagram');


    // frontend routes
    var get_assets = require('./frontend/assets');
    var get_home = require('./frontend/get_home');
    var get_event = require('./frontend/get_event');

    module.exports = [
        get_assets,
        get_home,
        get_event,
        get_instagram,
        post_instagram
    ];
})();
