var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var  methodOverride = require("method-override");
var mongoose = require("mongoose");
var expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/blog-react");

//app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
//must be after parser
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//schema config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	//it should be date. With default value now.
	created: {
		type: Date, default: Date.now
	}
});

var Blog = mongoose.model("Blog", blogSchema);

function handle500(error){
	console.log(error.stack);
	response.status(500);
	response.render("500");
}

app.get("/", function(request, response){
	response.redirect("/blogs");
});

app.get("/blogs", function(request, response){
	Blog.find({}, function(error, blogs){
		if(error){
			handle500(error);
		}else{			
			response.render("index", {blogs: blogs});
		}
	});	
});

app.get("/blogs/new", function(request, response){
	response.render("new");	
});

app.post("/blogs", function(request, response){	
	var body = {
		title: request.sanitize(request.body.title),
		image: request.sanitize(request.body.image),
		body: request.sanitize(request.body.body)
	};
	Blog.create(body, function(error, newBlog){
		if(error)
			handle500(error);
		else
			response.redirect("/blogs");
	});	
});

app.get("/blogs/:id", function(request, response){	
	Blog.findById(request.params.id, function(error, blog){
		if(error)
			handle500(error);
		else
			response.render("show",{blog: blog});			
	});	
});

app.get("/blogs/:id/edit", function(request, response){	
	Blog.findById(request.params.id, function(error, blog){
		if(error)
			handle500(error);
		else
			response.render("edit",{blog: blog});			
	});	
});

app.put("/blogs/:id", function(request, response){	
	var id = request.params.id;		
	var body = {
		title: request.sanitize(request.body.title),
		image: request.sanitize(request.body.image),
		body: request.sanitize(request.body.body)
	}

	Blog.findByIdAndUpdate(id, body, function(error, blog){
		if(error)
			handle500(error);
		else
			response.redirect("/blogs/"+id);
	});
});

app.delete("/blogs/:id", function(request, response){	
	var id = request.params.id;			

	Blog.findByIdAndRemove(id, function(error){
		if(error)
			handle500(error);
		else
			response.redirect("/blogs");
	});
});


app.use(function(request, response){	
	response.status(404);
	response.render("404");
});

//the callback has 4 args so - express treats this as 500 error handler
app.use(function(error, request, response, next){
	handle500(error);
});

//if Process env port is not defined - set 5000 as a port
app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
})