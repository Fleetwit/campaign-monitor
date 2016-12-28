

/*

node test.js -apikey XXXXXXXXXXXXX -clientid XXXXXXXXXXXXX

*/

var _			= require('underscore');
var pstack		= require('pstack');

function processArgs() {
	var i;
	var args 	= process.argv.slice(2);
	var output 	= {};
	for (i=0;i<args.length;i++) {
		var l1	= args[i].substr(0,1);
		if (l1 == "-") {
			if (args[i+1] == "true") {
				args[i+1] = true;
			}
			if (args[i+1] == "false") {
				args[i+1] = false;
			}
			if (!isNaN(args[i+1]*1)) {
				args[i+1] = args[i+1]*1;
			}
			output[args[i].substr(1)] = args[i+1];
			i++;
		}
	}
	return output;
};

var args	= processArgs();



var cm = require('./campaign-monitor');

var mail	= new cm({
	log:		true,
	apikey:		args.apikey,
	clientid:	args.clientid,
	client:		'default'	// Or use a client ID
});

var options	= _.map(_.range(1,500), function(item) {
	return 'race-'+item;
});


mail.transactional().templates(function(data) {
	mail.log("transactional", "templates", data);
});

/*
mail.list(args.listid).customFields(function(data) {
	mail.log("list", "customFields", data);
});
*/

/*
mail.list(args.listid).replaceCustomFieldOptions('list_blah', options,function(data) {
	mail.log("list", "replaceCustomFieldOptions", data);
});
*/

/*
mail.list(args.listid).createCustomField({
	"FieldName": "list_test",
	"DataType": "MultiSelectMany",
	"Options": options
},function(data) {
	mail.log("list", "createCustomFields", data);
});

*/
/*
mail.subscribers(args.listid).add({
	name:	'Julien Loutre',
	email:	'julien1@fleetwit.com',
	fields:	{
		hello:	'world'
	},
	restartAutoresponder:	true,
	resubscribe:	true
}, function(email) {
	mail.log("subscribers", "add", email);
	
	mail.subscribers(args.listid).get('julien1@fleetwit.com', function(response) {
		mail.log("subscribers", "get", response);
	});
});
*/
/*
mail.subscribers(args.listid).update('julien1@fleetwit.com', {
	name:		'Julien L.',
	firstname:	'Julien',
	lastname:	'Loutre',
	fields:	{
		$add: {
			played:			26,
			purchases:		5,
			last_played:	new Date().toISOString()
		},
		$remove: {
			credits:	true
		}
	},
}, function(response) {
	mail.log("subscribers", "update", response);
	
	mail.subscribers(args.listid).get('julien1@fleetwit.com', function(response) {
		mail.log("subscribers", "get", response);
	});
});
*/

/*mail.subscribers(args.listid).get('julien@fleetwit2.com', function(response) {
	mail.log("subscribers", "get", response);
});*/
/*
mail.subscribers(args.listid)._update('julien@fleetwit.com',{
	"EmailAddress": "julien@fleetwit2.com",
	"Name": "Lex Luthor",
	"CustomFields": [{
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
	}]
}, function(email) {
	mail.log("subscribers", "update", email);
});
*/

/*
mail.lists().all(function(response) {
_.each(response, function(list) {
mail.log("list each", "response", list);

var stack	= new pstack();
var buffer	= {};

stack.add(function(done) {
mail.list(list.ListID).get(function(data) {
mail.log("list", "get", data);
done();
});
});

stack.add(function(done) {
mail.list(list.ListID).stats(function(data) {
mail.log("list", "stats", data);
done();
});
});

stack.add(function(done) {
mail.list(list.ListID).customFields(function(data) {
mail.log("list", "customFields", data);
done();
});
});

stack.start(function() {

});
});
});
*/

/*
mail.lists().create({
"Title": "FleetWit Players",
"UnsubscribePage": "http://www.fleetwit.com/unsubscribe",
"UnsubscribeSetting": "AllClientLists",	// Or OnlyThisList
"ConfirmedOptIn": false,
"ConfirmationSuccessPage": "http://www.fleetwit.com/welcome"
}, function(response) {
mail.log("lists.create", "response:", response);
});
*/
/*
mail.useClient('default', function(clientId) {
mail.log("useClient", "clientId", clientId);
});
*/

/*
mail.GET({
endpoint:	'clients/lists.json'
}, function(response) {
mail.log("lists.json", "response", response);
});
*/