
// Dependencies
var _			= require('underscore');
var request 	= require('request');


var cm = function(options) {
	this.options	= _.extend({
		log:		false,
		url:		'https://api.createsend.com/api/v3.1/',
		apikey:		'',
		clientid:	''
	}, options);
	
	
	// API Import
	this.importAPI({
		lists:	'./API/lists'
	});
	
	this.log("Init", "options",this.options);
};

// Importing the API
cm.prototype.importAPI = function(conf) {
	var scope = this;
	_.each(conf, function(v,k) {
		var api	= require(v);
		
		scope[k]	= function() {
			return new api(scope);
		};
	});
}

// Logging. set logs=true when you init the class to enable.
cm.prototype.log = function() {
	if (!this.options.log) {
		return false;
	}
	var args	= Array.prototype.slice.call(arguments);
	var output	= '\033[41m#['+args[0]+']\033[37m\033[40m ';
	output	+= '\033[32m'+args[1]+'\033[37m\033[40m ';
	args	= args.slice(2);
	_.each(args, function(arg) {
		if (typeof arg == "object") {
			output	+= JSON.stringify(arg,null,4)+' ';
		} else {
			output	+= arg+' ';
		}
	});
	console.log(output);
	return true;
}


// GET method on any api endpoint. Executes an authenticated call.
cm.prototype.GET = function(options, callback) {
	var scope		= this;
	options.data	= _.extend({}, options.data);
	
	var obj = {
		url:	this.options.url+options.endpoint,
		method: "GET",
		data:	options.data,
		headers:	{
			'Authorization':	'Basic '+new Buffer(this.options.apikey+':x').toString('base64')
		}
	};
	
	this.log("GET", "obj", obj);
	
	request(obj, function(error, response, body) {
		callback(JSON.parse(body), response.statusCode);
		return false;
	});
	
	return this;
}


// POST method on any api endpoint. Executes an authenticated call.
cm.prototype.POST = function(options, callback) {
	var scope = this;
	options.data = _.extend({}, options.data);
	
	var obj = {
		url:	this.options.url+options.endpoint,
		method: "POST",
		json:	options.data,
		headers:	{
			'Authorization':	'Basic '+new Buffer(this.options.apikey+':x').toString('base64')
		}
	};
	
	this.log("POST", "obj", obj);
	
	request(obj, function(error, response, body) {
		var output;
		try {
			output	= JSON.parse(body);
		} catch (e) {
			output	= body;
		}
		callback(output, response.statusCode);
		return false;
	});
	
	return this;
}



// Internal Method: Select the requested client, or the default one
cm.prototype.useClient = function(client, callback) {
	var scope	= this;
	
	if (this.client && this.client.id) {
		callback(this.client.id);
	} else {
		// get the clients
		this.GET({
			endpoint:	'clients.json'
		}, function(response) {
			if (response && response.length>0) {
				if (client=='default' || !client) {
					// Use the first client in the list
					scope.client	= {
						id:		response[0].ClientID,
						name:	response[0].name
					};
				} else {
					var _client	= _.find(response, function(item) {
						return item.ClientID	== client;
					});
					scope.client	= {
						id:		_client.ClientID,
						name:	_client.name
					};
				}
				callback(scope.client.id);
			} else {
				throw ("No clients found on this account.");
			}
		});
	}
}

module.exports = cm;