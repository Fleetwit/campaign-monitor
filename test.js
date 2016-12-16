

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