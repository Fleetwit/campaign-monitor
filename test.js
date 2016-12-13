

/*

	node test.js -apikey XXXXXXXXXXXXX

*/


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

mail.lists().create({}, function(response) {
	mail.log("lists.create", "response", response);
});

/*
mail.useClient('default', function(clientId) {
	mail.log("useClient", "clientId", clientId);
});
*/

/*
mail.GET({
	endpoint:	'clients.json'
}, function(response) {
	mail.log("clients.json", "response", response);
});
*/