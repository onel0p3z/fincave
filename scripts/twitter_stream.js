'use strict';

(function() {
	var io = require('socket.io').listen(3000);
	io.set('transports', ["websocket", "polling"]);
	
    var Twit = require('twit');
    var T = new Twit({
        consumer_key:           process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:        process.env.TWITTER_CONSUMER_SECRET,
        access_token:           process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:    process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
	
	var stream = {};

    var contest = {
        _id : '544c6e18ac983a0000f86a07',
        name : 'The FinTank',
        hashtags : ['fintank', 'fincave', 'FinTank', 'FinCave', 'MiamiDolphins', 'Halloween'],
        running : true,
        active : true,
        start_time : 1414195200,
        stop_time : 1414367999
    };

	io.on('connection', function (socket) {
		io.emit('this', { will: 'be received by everyone'});
		console.log('socket server started.');
		
		stream = T.stream('statuses/filter', { track: contest.hashtags, language: 'en' });
	    stream.on('tweet', function(tweet) {
	        console.log('streaming received for', contest.name);
	        if (tweet.entities.media) {
	            var image = {
	                url: tweet.entities.media[0].media_url,
	                id: tweet.entities.media[0].id,
	                user: tweet.user.screen_name,
	                retweets: tweet.retweet_count,
	                favorites: tweet.favorite_count
	            };
	            socket.broadcast.emit('fincave', image);
	            console.log(image);
	        }
	        //console.log(tweet);
	    });

		socket.on('disconnect', function () {
			console.log('socket disconnects.');
			io.sockets.emit('user disconnected');
		});
	});
	
})();
