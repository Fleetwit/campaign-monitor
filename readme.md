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

### Create a custom field ###

	mail.list(XXXXXXX).createCustomField({
		"FieldName": "list_test",
		"DataType": "MultiSelectMany",
		"Options": ["hello","world"]
	},function(data) {
		mail.log("list", "createCustomFields", data);
	});

### Rename a custom field ###

	mail.list(XXXXXXX).renameCustomField('old name', 'new name', function(data) {
		mail.log("list", "renameCustomField", data);
	});

### Add custom field options ###

	mail.list(XXXXXXX).updateCustomFieldOptions('field name', ["option 1", "option 2", ...] ,function(data) {
		mail.log("list", "updateCustomFieldOptions", data);
	});

### Replace custom field options ###

	mail.list(XXXXXXX).replaceCustomFieldOptions('field name', ["option 1", "option 2", ...] ,function(data) {
		mail.log("list", "replaceCustomFieldOptions", data);
	});


## Subscribers ##
Select the list using `mail.subscribers(XXXXXXX)` where XXXXXXX is the list ID.

### Add a subscriber (API implementation) ###
	
	mail.subscribers(args.listid)._add({
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

### Add a subscriber (Easier params) ###
	
	mail.subscribers(args.listid).add({
		name:	'Julien Loutre',
		email:	'julien@fleetwit.com',
		fields:	{
			hello:	'world'
		},
		restartAutoresponder:	true,
		resubscribe:	true
	}, function(email) {
		mail.log("subscribers", "add", email);
	});


### Update a subscriber ###
	
	mail.subscribers(args.listid)._update("current_email@example.com",{
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


## Transactional ##


### List the transactional templates ###
	
	mail.transactional().templates(function(data) {
		mail.log("transactional", "templates", data);
	});