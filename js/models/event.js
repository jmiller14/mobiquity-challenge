// event model

var app = app || {};

(function () {
	'use strict';
	
	function sameDay(start, end) {
		return $.format.date(start, 'MM d yyyy') === $.format.date(end, 'MM d yyyy');;
	}
	
	app.Event = Backbone.Model.extend({
		getDateRange: function () {
			var start = this.attributes.start;
			var end = this.attributes.end;
			
			if (start === undefined || end === undefined) return false;
			
			if (start.hasOwnProperty('dateTime')) {
				start = Date.parse(start.dateTime);
				end = Date.parse(end.dateTime);
				
				if (start === end) {
					return $.format.date(start, 'MMM d, yyyy, h:mm a');
				} else if (sameDay(start, end)) {
					return $.format.date(start, 'MMM d, yyyy, h:mm a') + ' to ' + $.format.date(end, 'h:mm a');
				} else {
					return $.format.date(start, 'MMM d, yyyy h:mm a') + ' to ' + $.format.date(end, 'MMM d, yyyy h:mm a');
				}
			} else if (start.hasOwnProperty('date')) {
				start = Date.parse(start.date);
				end = Date.parse(end.date);

				if (sameDay(start, end)) {
					return $.format.date(start, 'MMM d, yyyy');
				} else {
					return $.format.date(start, 'MMM d, yyyy') + ' to ' + $.format.date(end, 'MMM d, yyyy');
				}				
			}
			
			return false;
		},
		
		getDate: function () {
			var start = this.attributes.start;
			var date = '';
			
			if (start === undefined) return false;
			
			if (start.hasOwnProperty('dateTime')) {
				date = Date.parse(start.dateTime);
			} else if (start.hasOwnProperty('date')) {
				date = Date.parse(start.date);
			}				
			
			return $.format.date(date, 'MMMM d, yyyy');
		}
	});	
})();
