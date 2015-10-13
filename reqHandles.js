
   var querystring = require("querystring"),
 		fs = require("fs"),
 		formidable = require("formidable");

 	var send404 = require("./router").send404;

   var path = require("path");
   var mime = require("mime");

   function start(response){
		console.log("request handler--start-- was called!!");

		/*var body = '<html>' +
			'<head>' +
			'<meta http-equiv="Content-Type" content="text/html; '+
			'charset=UTF-8" />'+
			'</head>'+
			'<body>'+
			'<form action="/upload" enctype="multipart/form-data"'
				+' method="post">'+
			'<input type="file" name="upload" multiple="multiple" />'+
		    '<input type="submit" value="Upload file" />'+
		    '</form>'+
		    '</body>'+
		    '</html>';

		    response.writeHead(200,{"Content-Type":"text/html"});
		    response.write(body);
		    response.end();*/
		    //console.log(response)
      
    	fs.readFile('./home.html', function (err, html) {  
	        if (err) {  
	            throw err;   
	        }         
	         
	        response.writeHeader(200, {"Content-Type": "text/html"});    
	        response.write(html);    
	        response.end();    
        
    	});  


   }


   function upload(response,request){
	  console.log("Request handler 'upload' was called.");

	  var form = new formidable.IncomingForm();


	  form.parse(request,function(error,fields, files){
	  		console.log(JSON.stringify(files.upload))
	  		fs.renameSync(files.upload.path, "/tmp/test.png");
	  		response.writeHead(200, {"Content-Type": "text/plain"});
	 	 	response.write("Received image:<br/> ");
	 	 	response.write("<img src='/show' />");
	  			
	  		response.end();
	  })
	  

   }

   /* show uploaded image*/
   function show(response,request){
   		console.log("Request hanlder 'show' was called. ");
   		fs.readFile("/tmp/test.png","binary",function(error,file){
   			if(error){
   				response.writeHead(500,{"Content-Type":"text/plain"});
   				response.write(error +"\n");
   				response.end();
   			}else{
   				response.writeHead(200,{"Content-Type":"image/png"});
   				response.write(file,"binary");
   				response.end();
   			}
   		})
   }

   /**
    import static files (such as .js/.css files)handler
   */
   function insert(response,request,pathname){
   		console.log("-----Request handler '"+pathname+"' was called");
   		fs.exists("."+pathname,function(exists){
   			if(!exists){
   				console.log("NOT FOUND  !!!!!")
   				send404(response,pathname);
   			}else{
   				fs.readFile("."+pathname,function(err,data){
   					if(err){
   						
   						send404(response,pathname);
   					}else{
   						console.log("static file found!");
   						response.writeHead(200,{"Content-Type":mime.lookup(path.basename(pathname))});

   						response.end(data);
   					}
   				})
   			}
   		})
   		

   }

   exports.start = start;
   exports.upload = upload;
   exports.show = show;
   exports.insert = insert;
  
