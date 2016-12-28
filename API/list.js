
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
	
	scope.cm.GET({
		endpoint:	'lists/'+scope.listId+'.json',
	}, function(response, code) {
		
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
		
	});
}
lists.prototype.stats = function(callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	scope.cm.GET({
		endpoint:	'lists/'+scope.listId+'/stats.json',
	}, function(response, code) {
		
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
		
	});
}
lists.prototype.customFields = function(callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	scope.cm.GET({
		endpoint:	'lists/'+scope.listId+'/customfields.json',
	}, function(response, code) {
		
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
		
	});
}
lists.prototype.createCustomField = function(data, callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	scope.cm.POST({
		endpoint:	'lists/'+scope.listId+'/customfields.json',
		data:		data
	}, function(response, code) {
		
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
		
	});
}
lists.prototype.renameCustomField = function(current_key, new_key, callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	

	scope.cm.PUT({
		endpoint:	'lists/'+scope.listId+'/customfields/['+current_key+'].json',
		data:		{
			FieldName:	new_key
		}
	}, function(response, code) {
		
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
		
	});
}
lists.prototype.updateCustomFieldOptions = function(current_key, options, callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	scope.cm.PUT({
		endpoint:	'lists/'+scope.listId+'/customfields/['+current_key+']/options.json',
		data:		{
			KeepExistingOptions:	true,
			Options:	options
		}
	}, function(response, code) {
		
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
		
	});
}
lists.prototype.replaceCustomFieldOptions = function(current_key, options, callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	scope.cm.PUT({
		endpoint:	'lists/'+scope.listId+'/customfields/['+current_key+']/options.json',
		data:		{
			KeepExistingOptions:	false,
			Options:	options
		}
	}, function(response, code) {
		
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
		
	});
}

module.exports = lists;