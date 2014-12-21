// events view

var app = app || {};

(function ($) {
	'use strict';
	
	app.EventsView = Backbone.View.extend({
		el: '#events',
		emptyTemplate: _.template($('script.no-events.template').html()),
		
		events: {
			'click #create': 'addEvent',
			'click #change': 'switchDate'
		},
		
		initialize: function () {
			this.collection = new app.Events();
			$('#date').attr('placeholder', this.collection.getDateToShow());

			this.render();
			
			this.listenTo(this.collection, 'add', this.render);
			this.listenTo(this.collection, 'reset', this.render);
		},
		
		render: function () {	
			var toShow = this.collection.toShow();
			
			var dateEvents = this.$el.find('ul.date.event.list');
			if (toShow.size() == 0) {
				dateEvents.html(this.emptyTemplate());
			} else {
				dateEvents.html('');
				
				toShow.each(function (item) {
					// @hack Cancelled events do not have start times.  Could also check if status == 'cancelled'
					if (item.attributes.hasOwnProperty('start')) {
						dateEvents.append(this.renderEvent(item));
					}
				}, this);			
			}
			
			var allEvents = this.$el.find('ul.all.event.list');
			if (this.collection.size() == 0) {
				allEvents.html(this.emptyTemplate());
			} else {
				allEvents.html('');
				
				this.collection.each(function (item) {
					if (item.attributes.hasOwnProperty('start')) {
						allEvents.append(this.renderEvent(item));
					}
				}, this);			
			}
			
			return this;
		},
		
		switchSource: function (calendarId) {
			var maxDate = new Date(Math.max(this.collection.dateToShow, Date.now()));
		
			this.collection.url = '/calendar/v3/calendars/' + calendarId +'/events';
			this.collection.fetch({
				reset: true,
				params: {
					singleEvents: true,
					orderBy: 'startTime',
					maxResults: 2500,
					timeMax: maxDate.toISOString()
				}
			});		
		},
		
		switchDate: function (e) {
			var $this = $('#date');
			var date = Date.parse($this.val());
			
			if (!isNaN(date)) {
				$this.addClass('valid').removeClass('invalid');
				this.collection.dateToShow = date;
				$('h2.date.events span').text('Events for ' + this.collection.getDateToShow());
				
				this.render();				
			} else {
				$this.addClass('invalid').removeClass('valid');
			}
			
			return false;
		},
		
		renderEvent: function (item) {
			var eventView = new app.EventView({
				model: item
			});
			
			return eventView.render().$el;						
		},
		
		addEvent: function (e) {
			// @todo Error messages?
			
			$('#createEvent').children('input').removeClass('valid').removeClass('invalid');
			
			var summary = $('#createEvent #summary').val();
			if (summary.length == 0) {
				$('#createEvent #summary').addClass('invalid');
				return false;
			} else {
				$('#createEvent #summary').addClass('valid');
			}
		
			var startDate = new Date($('#createEvent #startDate').val());
			if (isNaN(startDate)) {
				$('#createEvent #startDate').addClass('invalid');
				return false;
			} else {
				$('#createEvent #startDate').addClass('valid');
			}
			
			var endDate = new Date($('#createEvent #endDate').val());
			if (isNaN(endDate)) {
				$('#createEvent #endDate').addClass('invalid');
				return false;
			} else {
				$('#createEvent #endDate').addClass('valid');
			}
			
			$('#createEvent').children('input').val('');
		
			this.collection.create({
				summary: summary,
				start: { dateTime: startDate.toISOString() },
				end: { dateTime: endDate.toISOString() }
			});
		
			return false;
		}
	});
})(jQuery);
