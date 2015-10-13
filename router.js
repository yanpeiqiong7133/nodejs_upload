   var path = require("path");

   function send404(response,pathname){
      response.writeHead(404,{'Content-Type':'text/plain'});
      response.write("Error 404: '"+pathname+"' no found!");
      response.end();
   }

 
   function route(handle, pathname, response, request){
       console.log("About to route a request for "+pathname);

       //	
       if(pathname.split(".").length>1){
          handle["/insert"](response,request,pathname.substring(0,pathname.length-1));
       }else if(typeof handle[pathname]=='function'){
       		handle[pathname](response,request);
       }else{
       		send404(response,pathname);
       }
   }  
   exports.send404=send404;
   exports.route = route;

