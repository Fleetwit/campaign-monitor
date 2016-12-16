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

## Lists ##

### List the lists ###
	
	mail.lists().all(function(response) {
		mail.log("lists.all", "response:", response);
	});


### Creation ###
	
	mail.lists().create({
		"Title": "Website Subscribers",
		"UnsubscribePage": "http://www.example.com/unsubscribed.html",
		"UnsubscribeSetting": "AllClientLists",	// Or OnlyThisList
		"ConfirmedOptIn": false,
		"ConfirmationSuccessPage": "http://www.example.com/joined.html"
	}, function(response) {
		mail.log("lists.create", "response:", response);
	});


## List ##
Select the list using `mail.list(XXXXXXX)` where XXXXXXX is the list ID.

### Get the list details ###
	
	mail.list(XXXXXXX).get(function(response) {
		mail.log("list.get", "response:", response);
	});

### Get the list stats ###
	
	mail.list(XXXXXXX).stats(function(response) {
		mail.log("list.stats", "response:", response);
	});

### Get the list custom fields ###
	
	mail.list(XXXXXXX).customFields(function(response) {
		mail.log("list.customFields", "response:", response);
	});


## Subscribers ##
Select the list using `mail.subscribers(XXXXXXX)` where XXXXXXX is the list ID.

### Add a subscriber ###
	
	mail.subscribers(args.listid).add({
		"EmailAddress": "julien@fleetwit.com",
		"Name": "Julien Loutre",
		"CustomFields": [{
			"Key": "played",
			"Value": 254
		}],
		"Resubscribe": true,
		"RestartSubscriptionBasedAutoresponders": false
	}, function(email) {
		mail.log("subscribers", "add", email);
	});


### Update a subscriber ###
	
	mail.subscribers(args.listid).update({
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
	}, function(email) {
		mail.log("subscribers", "add", email);
	});