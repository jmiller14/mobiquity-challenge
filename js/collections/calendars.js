// calendars collection

var app = app || {};

(function () {
	'use strict';
	
	app.Calendars = GapiCollection.extend({
		model: app.Calendar,
		url: '/calendar/v3/users/me/calendarList'
	});
})();
