// events collection

var app = app || {};

(function () {
	'use strict';
	
	app.Events = GapiCollection.extend({
		model: app.Event,
		dateToShow: Date.now(),
		
		comparator: function(event) {
			var start = event.attributes.start;
			
			if (start.hasOwnProperty('dateTime')) {
				return Date.parse(start.dateTime);
			} else if (start.hasOwnProperty('date')) {
				return Date.parse(start.date);
			}
			
			return 0;
		},
		
		toShow: function() {			
			var today = new Date(this.dateToShow);
			today.setHours(0, 0, 0, 0);
			
			var tomorrow = new Date(this.dateToShow);
			tomorrow.setHours(24, 0, 0, 0);			
		
			return _(this.filter(function (event) {
				var start = event.attributes.start;
				var end = event.attributes.end;
				
				if (start === undefined || end === undefined) return false;
				
				if (start.hasOwnProperty('dateTime')) {
					start = Date.parse(start.dateTime);
					end = Date.parse(end.dateTime);
				} else if (start.hasOwnProperty('date')) {
					start = Date.parse(start.date);
					end = Date.parse(end.date);			
				}
								
				if (start >= today && start < tomorrow) return true;
				if (start < today && end >= today) return true;
				
				return false;
			}));
		},
		
		getDateToShow: function () {
			return $.format.date(this.dateToShow, 'MMMM d, yyyy');
		}
	});
})();
