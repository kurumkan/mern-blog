var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var  methodOverride = require("method-override");
var mongoose = require("mongoose");
var expressSanitizer = require("express-sanitizer");
var {handle500} = require("./lib/utils");

mongoose.connect(process.env.MONGOLAB_URI);

//app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());//must be to work with axios
app.use(bodyParser.urlencoded({extended: true}));
//must be after parser
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//schema config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,	
	created: {
		type: Date, default: Date.now
	}
});

var Blog = mongoose.model("Blog", blogSchema);

//index route
app.get("/api/blogs", function(request, response){		

	Blog.find({}).sort("-created").limit(15).exec(function(error, blogs){
		if(error){
			handle500(response, error);
		}else{						
			response.json({blogs: blogs});		
		}
	});	
});

//show route
app.get("/api/blogs/:id", function(request, response){		
	Blog.findById(request.params.id, function(error, blog){		
		if(error)
			handle500(response, error);
		else
			response.json({blog: blog});		
	});	
});

//create route
app.post("/api/blogs", function(request, response){				
	var blog = {
		title: request.sanitize(request.body.title),
		image: request.sanitize(request.body.image),
		body: request.sanitize(request.body.body)
	};	
	Blog.create(blog, function(error, newBlog){
		if(error){			
			handle500(response, error);
		}else{			
			response.json({id: newBlog._id});			
		}
	});	
});

//update route
app.put("/api/blogs/:id", function(request, response){		
	var id = request.params.id;		
	var body = {
		title: request.sanitize(request.body.title),
		image: request.sanitize(request.body.image),
		body: request.sanitize(request.body.body)
	}

	Blog.findByIdAndUpdate(id, body, function(error, blog){
		if(error)
			handle500(error);
		else{			
			response.json({id: blog._id});				
		}
	});
});

//destroy route
app.delete("/api/blogs/:id", function(request, response){	
	var id = request.params.id;			

	Blog.findByIdAndRemove(id, function(error){
		if(error)
			handle500(error);
		else
			response.json({id: id});				
	});
});

app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
})