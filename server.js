/*
server.js
*/

/*
IMPORT Modules
*/
var http = require("http");
var url = require("url");



/*
onRequest -- helper function

http://nodejs.org/api/http.html#http_event_request
a function which is automatically added to the request event
- emitted each time there is a request (may be multiple requests per connection)

request and response are objects --> use their methods 
to handle the details of the HTTP request + to respond to the request

response object passed on to router so that the reponse can be executed in requestHandlers

Node serves POST data in small chunks to make the process a non-blocking operation
2 listeners on request object ( to catch POST data): 
	- data (called every time a POST data chunk is received)
	- end  (called once all POST data is received)
*/
function start(route, handle) { // takes a routing fuction in order to complete the routing action


	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname; // parse url pathname from request object
		console.log("Request for " +pathname+ " received.");
		var postData = "";

		request.setEncoding('utf8');


		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk; // gathering chunks of POST data together
			console.log("Received POST data chunk '"+
				postDataChunk +"'.");

		});

		//only call route at "end", when all POST data is gathered
		request.addListener("end", function(){
			route(handle, pathname, response, postData);
			 //handle object, pathname, response object, and postData are sent to router
		});
		

		/*
		response.writeHead(200, {"Content-Type": "text/plain"}); //header with status and content type
		var content = route(handle, pathname, response); //handle object and pathname sent to router
		response.write(content); // response body
		response.end(); // finish response
		*/

	} // end function onRequest


	// Create Server
	console.log("Creating Server...");
	http.createServer(onRequest).listen(8888); // pass onRequest function
	console.log("Server has started.");

} // end function start

exports.start = start;
