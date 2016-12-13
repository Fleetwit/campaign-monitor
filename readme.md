# Campaign Monitor API #

This package in under active development.

Please do not use in production.


In the meantime, please use [https://www.npmjs.com/package/createsend-node](https://www.npmjs.com/package/createsend-node) (different author)

## Demo ##

	var cm = require('campaign-monitor');
	
	var mail	= new cm({
		log:		true,
		apikey:		'xxxxx',
		clientid:	'xxxxx',
		client:		'default'	// Or use a client ID
	});
	
	// Create a new list
	mail.lists().create({
		"Title": "Website Subscribers",
		"UnsubscribePage": "http://www.example.com/unsubscribed.html",
		"UnsubscribeSetting": "AllClientLists",	// Or OnlyThisList
		"ConfirmedOptIn": false,
		"ConfirmationSuccessPage": "http://www.example.com/joined.html"
	}, function(response) {
		mail.log("lists.create", "response:", response);
	});
	
	
	// General purpose GET method:
	mail.GET({
		endpoint:	'clients.json'
	}, function(response) {
		mail.log("clients.json", "response", response);
	});
	
	// General purpose POST method:
	mail.POST({
		endpoint:	'lists/XXXX.json',	// XXXX -> client ID
		data:		{
			"Title": "Website Subscribers",
			"UnsubscribePage": "http://www.example.com/unsubscribed.html",
			"UnsubscribeSetting": "AllClientLists",	// Or OnlyThisList
			"ConfirmedOptIn": false,
			"ConfirmationSuccessPage": "http://www.example.com/joined.html"
		}
	}, function(response) {
		mail.log("List creation", "response", response);
	});