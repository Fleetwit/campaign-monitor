
var _			= require('underscore');

var lists	= function(args) {
	this.cm		= args[0];
	this.listId	= args[1];
};


lists.prototype.templates = function(callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	// Get the client ID
	this.cm.useClient(this.cm.options.client, function(clientId) {
		scope.cm.GET({
			endpoint:	'transactional/smartEmail?status=all&clientID='+clientId,
		}, function(response, code) {
			
			callback(response);	// List data or error object {Code:xxx, Message: '...'}
			
		});
	});
}
module.exports = lists;