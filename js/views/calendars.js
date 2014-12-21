// calendars view

var app = app || {};

(function ($) {
	'use strict';
	
	app.CalendarsView = Backbone.View.extend({
		el: '.calendar.list',
		emptyTemplate: _.template($('script.no-calendars.template').html()),
		
		initialize: function () {
			this.collection = new app.Calendars();
			this.collection.fetch({ reset: true });
			
			this.render();
			
			this.listenTo(this.collection, 'reset', this.render);
		},
		
		render: function () {
			if (this.collection.size() == 0) {
				this.$el.html(this.emptyTemplate());
			} else {
				this.$el.html('');
				
				this.collection.each(function (item) {
					this.$el.append(this.renderCalendar(item));
				}, this);
			}
		},
		
		renderCalendar: function (item) {
			var calendarView = new app.CalendarView({
				model: item
			});
			
			return calendarView.render().$el;
		}
	});
})(jQuery);
