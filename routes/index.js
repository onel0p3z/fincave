(function() {
    'use strict';

    var get_instagram = require('./get_instagram');
    var post_instagram = require('./post_instagram');
    var post_events = require('./post_events');


    // frontend routes
    var get_assets = require('./frontend/assets');
    var get_home = require('./frontend/get_home');
    var get_event = require('./frontend/get_event');

    module.exports = [
        get_assets,
        get_event,
        get_home,
        get_instagram,
        post_events,
        post_instagram
    ];
})();
