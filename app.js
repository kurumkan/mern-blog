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
app.use(bodyParser.json());
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


function createDummyData(){
	var blogs = [
	{title: "title1", body: "body1", image: "https://pp.vk.me/c636825/v636825284/32767/VsYbJXx9gv0.jpg"},
	{title: "title2", body: "body2", image: "https://pp.vk.me/c638024/v638024144/c752/PsQdafO0mLc.jpg"},
	{title: "title3", body: "body3", image: "https://pp.vk.me/c626920/v626920367/16b07/EoA_rALAB0c.jpg"}
	]
	
	blogs.forEach(function(blog){
		Blog.create(blog, function(error, newBlog){
			if(error)
				console.log("error on insert")
		});		
		console.log("success inserted")
	});	
}

function deleteDummyData(){
	Blog.remove({}, function(error){
		if(error)
			console.log("error on delete")
		else{
			console.log("success delete")
			createDummyData();
		}
	});
}

deleteDummyData();






function handle500(response, error){
	console.log(error.stack);
	response.status(500);
	response.json({error: "error: internal server error"});		
}

app.get("/api/blogs", function(request, response){	
	Blog.find({}, function(error, blogs){
		if(error){
			handle500(response, error);
		}else{			
			response.json({blogs: blogs});		
		}
	});	
});

app.get("/api/blogs/:id", function(request, response){		
	Blog.findById(request.params.id, function(error, blog){		
		if(error)
			handle500(response, error);
		else
			response.json({blog: blog});		
	});	
});

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

app.delete("/api/blogs/:id", function(request, response){	
	var id = request.params.id;			

	Blog.findByIdAndRemove(id, function(error){
		if(error)
			handle500(error);
		else
			response.json({id: id});				
	});
});


// app.use(function(request, response){	
// 	response.status(404);
// 	response.render("404");
// });

// //the callback has 4 args so - express treats this as 500 error handler
// app.use(function(error, request, response, next){
// 	handle500(error);
// });

//if Process env port is not defined - set 5000 as a port
app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
})