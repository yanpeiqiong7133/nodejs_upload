
   var server = require("./server");
   var route = require("./router").route;
   var handlers = require("./reqHandles");
   var handle={};
   handle["/"] = handlers.start;
   handle["/start"] = handlers.start;
   handle["/upload"] = handlers.upload;
   handle["/show"] = handlers.show; 
   handle["/insert"] = handlers.insert;

   server.start(handle,route);
