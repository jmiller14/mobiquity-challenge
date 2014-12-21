// event view

var app = app || {};

(function ($) {
	'use strict';

	app.EventView = Backbone.View.extend({
		tagName: 'li',
		className: 'event',
		template: _.template($('script.event.template').html()),
		
		events: {
			'click .delete': 'deleteEvent'
		},
		
		render: function() {	
			this.$el.html(this.template({
				title: this.model.attributes.summary,
				date: this.model.getDateRange()
			}));
			
			return this;
		},
		
		deleteEvent: function (e) {
			this.model.destroy();
			this.remove();
			
			return false;
		}
	});
})(jQuery);

