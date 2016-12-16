
var _			= require('underscore');

var lists	= function(args) {
	this.cm		= args[0];
};

lists.prototype.create = function(options, callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	options	= _.extend({
		"Title": "Website Subscribers",
		"UnsubscribePage": "http://www.example.com/unsubscribed.html",
		"UnsubscribeSetting": "AllClientLists",	// Or OnlyThisList
		"ConfirmedOptIn": false,
		"ConfirmationSuccessPage": "http://www.example.com/joined.html"
	}, options);
	
	// Get the client ID
	this.cm.useClient(this.cm.options.client, function(clientId) {
		
		scope.cm.POST({
			endpoint:	'lists/'+clientId+'.json',
			data:		options
		}, function(response, code) {
			
			callback(response);	// List ID or error object {Code:xxx, Message: '...'}
			
		});
	});
}

lists.prototype.all = function(callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	// Get the client ID
	this.cm.useClient(this.cm.options.client, function(clientId) {
		
		scope.cm.GET({
			endpoint:	'clients/'+clientId+'/lists.json'
		}, function(response, code) {
			
			callback(response);	// List data or error object {Code:xxx, Message: '...'}
			
		});
	});
}

module.exports = lists;