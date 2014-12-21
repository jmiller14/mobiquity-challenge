Backbone.ajax = function () {
	var args = Array.prototype.slice.call(arguments, 0);
	var oldReq = args[0];
	
	var req = gapi.client.request({
		method: oldReq.type,
		path: oldReq.url,
		params: oldReq.params,
		body: oldReq.data
	});

	return req.then.apply(req, [oldReq.success, oldReq.error]);
};

var GapiCollection = Backbone.Collection.extend({
	fetch: function (options) {
		options = options ? _.clone(options) : {};
		
		if (options.parse === void 0) options.parse = true;
		
		var success = options.success;
		var collection = this;
		
		options.success = function(resp) {
			resp = resp.result.items; // this is the only change required
		
			var method = options.reset ? 'reset' : 'set';
			collection[method](resp, options);
			if (success) success(collection, resp, options);
			collection.trigger('sync', collection, resp, options);
		};
		
		// @todo Fix this, instead of just commenting it out
		// wrapError(this, options);
		return this.sync('read', this, options);
	}
});
