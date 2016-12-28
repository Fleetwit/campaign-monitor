
var _			= require('underscore');
var pstack		= require('pstack');

var lists	= function(args) {
	this.cm		= args[0];
	this.listId	= args[1];
};


lists.prototype._add = function(data, callback) {
	var scope = this;
	
	/*
	data:
	{
	    "EmailAddress": "subscriber@example.com",
	    "Name": "New Subscriber",
	    "CustomFields": [
	        {
	            "Key": "website",
	            "Value": "http://example.com"
	        },
	        {
	            "Key": "interests",
	            "Value": "magic"
	        },
	        {
	            "Key": "interests",
	            "Value": "romantic walks"
	        }
	    ],
	    "Resubscribe": true,
	    "RestartSubscriptionBasedAutoresponders": true
	}
	*/
	
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

lists.prototype._update = function(email, data, callback) {
	var scope = this;
	
	/*
	data:
	{
	    "EmailAddress": "changed_address@example.com",
	    "Name": "Changed Name",
	    "CustomFields": [
	        {
	            "Key": "website",
	            "Value": "http://example.com"
	        },
	        {
	            "Key": "interests",
	            "Value": "magic"
	        },
	        {
	            "Key": "interests",
	            "Value": "dungeons and dragons"
	        },
	        {
	            "Key": "age",
	            "Value": "",
	            "Clear": true
	        }
	    ],
	    "Resubscribe": true,
	    "RestartSubscriptionBasedAutoresponders": true
	}
	*/
	
	this.cm.log("_update", "data", data);
	
	
	if (!callback) {
		callback	= function() {}
	}
	
	scope.cm.PUT({
		endpoint:	'subscribers/'+this.listId+'.json?email='+email,
		data:		data
	}, function(response, code) {
		
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
		
	});
}


lists.prototype.get = function(email, callback) {
	var scope = this;
	
	if (!callback) {
		callback	= function() {}
	}
	
	scope.cm.GET({
		endpoint:	'subscribers/'+this.listId+'.json?email='+email
	}, function(response, code) {
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
	});
}





lists.prototype.add = function(data, callback) {
	var scope = this;
	
	/*
	data:
	{
	    email:	'',
	    name:	'',
	    fields:	{
	    	name:	value
	    },
	    restartAutoresponder:	true,
	    resubscribe:	true
	}, 
	*/
	
	
	// Rebuild the params
	var data	= _.extend({
		email:	'',
		name:	'',
		fields:	{},
		restartAutoresponder:	true,
		resubscribe:	true
	}, data);
	
	var _data	= {};
	_.each(data, function(v,k) {
		switch (k) {
			case "email":
				_data.EmailAddress	= v;
			break;
			case "name":
				_data.Name	= v;
			break;
			case "restartAutoresponder":
				_data.RestartSubscriptionBasedAutoresponders	= v;
			break;
			case "resubscribe":
				_data.Resubscribe	= v;
			break;
			case "fields":
				_data.CustomFields	= _.map(v, function(value, key) {
					return {
						Key:	key,
						Value:	value
					};
				});
			break;
		}
	});
	
	//this.cm.log("add", "_data", _data);
	
	//return false;
	
	if (!callback) {
		callback	= function() {}
	}
	
	scope.cm.POST({
		endpoint:	'subscribers/'+this.listId+'.json',
		data:		_data
	}, function(response, code) {
		
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
		
	});
}


lists.prototype.update = function(email, data, callback) {
	var scope = this;
	
	/*
	data:
	{
		name:	'Julien L.',
		email:	'julien@fleetwit2.com',
		fields:	{
			$add: {
				races:	26,
				list:	['hello','world']
			},
			$remove:	{
				hello:	'world'
			}
		},
		resubscribe:	true
	}
	*/
	
	// Rebuild the params
	var data	= _.extend({
		
	}, data);
	
	//this.cm.log("update", "data", data);
	
	var _data	= {};
	_.each(data, function(v,k) {
		switch (k) {
			case "email":
				_data.EmailAddress	= v;
			break;
			case "name":
				_data.Name	= v;
			break;
			case "firstname":
				_data.firstname	= v;
			break;
			case "lastname":
				_data.lastname	= v;
			break;
			case "restartAutoresponder":
				_data.RestartSubscriptionBasedAutoresponders	= v;
			break;
			case "resubscribe":
				_data.Resubscribe	= v;
			break;
			case "fields":
				if (!_data.CustomFields) {
					_data.CustomFields	= {};
				}
				
				if (v.$add) {
					_.each(v.$add, function(value, key) {
						_data.CustomFields[key]	= {
							Key:	key,
							Value:	value
						};
					});
				}
				if (v.$remove) {
					_.each(v.$remove, function(value, key) {
						_data.CustomFields[key]	= {
							Key:	key,
							Value:	'',
							Clear:	true
						};
					});
				}
				
				_data.CustomFields	= _.map(_data.CustomFields, function(value, key) {
					return value;
				});
			break;
		}
	});
	
	//this.cm.log("update", "_data", _data);
	
	if (!callback) {
		callback	= function() {}
	}
	
	scope.cm.PUT({
		endpoint:	'subscribers/'+this.listId+'.json?email='+email,
		data:		_data
	}, function(response, code) {
		
		//scope.cm.log("update", "response", response);
		
		callback(response);	// List data or error object {Code:xxx, Message: '...'}
		
	});
}

module.exports = lists;