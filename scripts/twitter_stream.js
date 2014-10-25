'use strict';

(function() {
    var Twit = require('twit');
    var T = new Twit({
        consumer_key:           process.env.TWITTER_KEY,
        consumer_secret:        process.env.TWITTER_SECRET,
        access_token:           process.env.TWITTER_TOKEN,
        access_token_secret:    process.env.TWITTER_TOKEN_SECRET
    });

    var stream = T.stream('statuses/filter', { track: '#fintank', language: 'en' });

    stream.on('tweet', function(tweet) {
        console.log(tweet);
    });
})();
