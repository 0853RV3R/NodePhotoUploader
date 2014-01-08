/*

index.js

MAIN FILE, Bootstrapper
*/

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");


// handle object --> list of name value pairs, where the values can be functions
// almost like associative array or dictionary
var handle = {}
// key-value pairs, associating a pathname with requestHandler function
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
server.start(router.route, handle);