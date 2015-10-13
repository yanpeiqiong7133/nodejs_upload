
 var http = require("http");
 var url = require("url");
 var formidable = require('formidable');


 function start(handle,route){
 	//path.join(__dirname,"./web/home.js");
    http.createServer(function(request, response){
    	//console.log(request.url)
      var pathname = url.parse(request.url).pathname;
      console.log("Request for"+ pathname  +" received!");
      route(handle,pathname,response,request);

   }).listen(3000);	
}

  exports.start = start;
