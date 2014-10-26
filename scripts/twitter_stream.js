'use strict';

(function() {
    var io = require('socket.io')(8080);
    var Twit = require('twit');
    var T = new Twit({
        consumer_key:           process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:        process.env.TWITTER_CONSUMER_SECRET,
        access_token:           process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:    process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    var contest = {
        _id : '544c6e18ac983a0000f86a07',
        name : 'The FinTank',
        hashtags : ['fintank', 'fincave', 'FinTank', 'FinCave'],
        running : true,
        active : true,
        start_time : 1414195200,
        stop_time : 1414367999
    };

    var stream = T.stream('statuses/filter', { track: contest.hashtags, language: 'en' });
console.log(contest);
    stream.on('tweet', function(tweet) {
        console.log('streaming received for', contest.name);
        if (tweet.entities.media) {
            var image = {
                url: tweet.entities.media[0].media_url,
                user: tweet.user.screen_name,
                retweets: tweet.retweet_count,
                favorites: tweet.favorite_count
            }
            io.emit('fincave', image);
            console.log(image);
        }
        //console.log(tweet);
    });

})();
