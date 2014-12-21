// calendar view

var app = app || {};

(function ($) {
	'use strict';

	app.CalendarView = Backbone.View.extend({
		tagName: 'li',
		className: 'calendar',
		template: _.template($('script.calendar.template').html()),
		
		events: {
			'click': 'select'
		},
		
		render: function() {
			this.$el.html(this.template(this.model.attributes));
			
			return this;
		},
		
		select: function (e) {
			// @hacky
			Backbone.$('#create').prop('disabled', false);
			
			this.$el.addClass('selected').siblings().removeClass('selected');
			app.eventsView.switchSource(this.model.attributes.id);
		}
	});
})(jQuery);

