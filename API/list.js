
var _			= require('underscore');

var lists	= function(args) {
	this.cm		= args[0];
	this.listId	= args[1];
};


lists.prototype.get = function(callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	// Get the client ID
	this.cm.useClient(this.cm.options.client, function(clientId) {
		
		scope.cm.GET({
			endpoint:	'lists/'+scope.listId+'.json',
		}, function(response, code) {
			
			callback(response);	// List data or error object {Code:xxx, Message: '...'}
			
		});
	});
}
lists.prototype.stats = function(callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	// Get the client ID
	this.cm.useClient(this.cm.options.client, function(clientId) {
		
		scope.cm.GET({
			endpoint:	'lists/'+scope.listId+'/stats.json',
		}, function(response, code) {
			
			callback(response);	// List data or error object {Code:xxx, Message: '...'}
			
		});
	});
}
lists.prototype.customFields = function(callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	// Get the client ID
	this.cm.useClient(this.cm.options.client, function(clientId) {
		
		scope.cm.GET({
			endpoint:	'lists/'+scope.listId+'/customfields.json',
		}, function(response, code) {
			
			callback(response);	// List data or error object {Code:xxx, Message: '...'}
			
		});
	});
}

module.exports = lists;