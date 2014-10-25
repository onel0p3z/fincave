'use strict';

(function() {

    var Twit = require('twit');
    var T = new Twit({
        consumer_key:           process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:        process.env.TWITTER_CONSUMER_SECRET,
        access_token:           process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:    process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    function TwitterStream (contest) {
        if(!contest.hastags || contest.hashtags === '') {
            return false;
        }

        var stream = this.stream = T.stream('statuses/filter', { track: contest.hashtags, language: 'en' });

        stream.on('tweet', function(tweet) {
            console.log(tweet);
        });
    }

    TwitterStream.prototype.addImage = function() {
        var app = require('../server');
    };

    TwitterStream.prototype.stop = function() {
        try {
            this.stream.stop();
            console.log('Stream stopped successfuly', this.contest.name);
        }
        catch (e) {
            console.log('Error stoping streaming...', e);
        }
    };

    TwitterStream.prototype.reststart = function() {
        try {
            this.stream.start();
            console.log('Streaming started successfuly...', this.contest.name);
        }
        catch(e) {
            console.log('Error starting streaming ...', e);
            return false;
        }
    };
})();
