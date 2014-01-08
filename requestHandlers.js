/*

requestHandlers.js

'Handling' requests means 'answering' requests

There's a function for every request handler.
This allows us to wire the request handlers into the router.js,
	 giving our router something to route to.

Node module 'child_process' has useful non-blocking operation, exec().
exec() executes a shell command from within Node.js
 ("ls -lah" = get list of all files in current directory) 
*/

var querystring = require("querystring");

/*
var exec = require("child_process").exec; 

function sleep(milliSeconds){
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime +milliSeconds);
	}
*/

function start(response){
	console.log("Request handler 'start' was called.");
	
	var body = '<html>'+
				'<head>'+
				 '<meta http-equiv="Content-Type" content="text/html; '+
				 'charset=UTF-8" />'+
				 '</head>'+
				 '<body>'+
				 '<form action="/upload" method="post">'+ // clicking on button redirects to uploads path
				 '<textarea name="inputText1" rows="20" cols="50"></textarea>'+
				 '<input type="submit" value="Submit text" />'+
				 '</form>'+
				 '</body>'+
				 '</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();







	//var content = 'empty';

	/*
	exec("ls -lah" ,function(errror, stdout, stderr) {
		response.writeHead(200, {"Content Type": 'text/plain'});
		response.write(stdout);
		response.end();
	});
	*/

	/*
	sleep for 10sec, 
	to simulate a blocking operation 
	(i.e. a long-running computation)
	
	console.log("starting to sleep for 10 secs...");
	sleep(10000); 
	*/

	/*
	response.writeHead(200, {'Content-Type': "text/plain" });
	response.write(content);
	response.end();
	*/
}

function upload(response, postData){
	console.log("Request handler 'upload' was called.");
	console.log(postData);
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write("You've sent the text: " + querystring.parse(postData).inputText1);
	response.end();

}

exports.start = start;
exports.upload = upload;