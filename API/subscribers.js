
var _			= require('underscore');

var lists	= function(args) {
	this.cm		= args[0];
	this.listId	= args[1];
};


lists.prototype.add = function(data, callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	scope.cm.POST({
		endpoint:	'subscribers/'+this.listId+'.json',
		data:		data
	}, function(response, code) {
		
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
		
	});
}

module.exports = lists;