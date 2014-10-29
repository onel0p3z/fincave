(function() {
    'use strict';

    module.exports = function (db) {
        var config = require('../config');
        var async = require('async');
        var io = require('socket.io')(8080);
        var ig = require('instagram-node').instagram();
        var inspect = require('util').inspect;
        var insobj = { depth: 10, colors: true };

        ig.use({
            client_id: config.instagram_client_id,
            client_secret: config.instagram_client_secret
        });

        ig.tag_media_recent('fintank', function(err, medias, pagination, remaining, limit) {
            if (err) {
                return console.error('ig#tag_media_recent::ERR', err);
            }

            console.log('medias', inspect(medias, insobj));
            console.log('pagination', pagination);
            console.log('remaining', remaining);
            console.log('limit', limit);

            async.series({
                process_medias: function (callback) {
                    // process incoming media
                    //@TODO:parallel processing for db saving
                    medias.forEach(function (data) {
                        var image = {
                            url: data.images.low_resolution.url,
                            img_id: data.id,
                            user: data.user.username,
                            time: data.created_time,
                            likes: data.likes.count
                        };

                        console.log(JSON.stringify(image));

                        io.emit('fincave', image);

                        callback(null, JSON.stringify(image));
                    });
                },
                set_new_min: function (callback) {
                    console.log('setting new min and max tag ids');
                    callback(null, 'set all up!');
                    /*
                    // set the new min tag id
                    var updates = {
                        $set: {
                            min_tag_id: pagination.min_tag_id,
                            max_tag_id: pagination.max_tag_id,
                            dlu: (new Date()).getTime()
                        }
                    //};

                    db.collection('entries').update(updates, function (err, result) {
                        if (err) {
                            console.error('update ERR', err);
                            callback(err);
                        }
                        callback(null, result);
                    });
                    */
                },
                emitting_to_socketio: function (callback) {
                    console.log('emitting to socket.io');
                    callback(null, 'emitted everything dawg !!');
                }
            }, function (err, results) {
                // show results
                if (err) {
                    console.error('ASYNC_RETURN_ERR', err);
                }

                console.log('RESULTS_ASYNC', results);
            });
        });
    };
})();

