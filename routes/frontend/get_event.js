'use strict';
(function() {

	function getEventHandler (request, reply) {
		reply.view('event', {
			title: 'Event'
		});
	}

	module.exports = {
		path: '/event',
		method: 'GET',
		handler: getEventHandler
	};
})();
