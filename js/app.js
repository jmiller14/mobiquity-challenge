var app = app || {};

$(document).ready(function () {
	'use strict';
	
	$('input[type="datetime"]').each(function (i, el) {
		var picker = new Pikaday({ field: $(this)[0] });
	});

	$('#auth').removeAttr('disabled').click(function (e) {
		gapi.auth.authorize({
			'client_id': '796094441148-10t7ovu8695meldn21la3ma7iktai8in.apps.googleusercontent.com',
			'scope': 'https://www.googleapis.com/auth/calendar'
		}, function() {
			// Successfully authorized, start the app!
			
			$('.initial').hide();
			$('.main').show();
			
			app.calendarsView = new app.CalendarsView();
			app.eventsView = new app.EventsView();
		});	
	
		return false;
	});
});
