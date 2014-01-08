/* 
router.js

handle is an object, associating a pathname with requestHandler function

response object is passed on to the requestHandler functions
*/

function route(handle, pathname, response, postData){

	console.log("About to route a request for "+ pathname);
	// we check if a request handler for the given pathname exists
	// if it does we simply call the corresponding function to handle the request
	if (typeof handle[pathname] === 'function'){
		 handle[pathname](response, postData); // "please, 'handle' this 'pathname'"
	}
	else{
		console.log("No request handler found for "+pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}


}

exports.route = route;