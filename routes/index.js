'use strict';

(function() {
    var get_instagram = require('./get_instagram');
    var post_instagram = require('./post_instagram');


    // frontend routes
    //var get_about_us = require('./frontend/get_about_us');
    var get_home = require('./frontend/get_home');
    var get_event = require('./frontend/get_event');

    module.exports = [
        get_home,
        //get_about_us,
        get_event,
        get_instagram,
        post_instagram
    ];
})();
