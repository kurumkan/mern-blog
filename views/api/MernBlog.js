var axios = require('axios');

module.exports = {
	//get all the blogs
	getBlogs: function(){
		var requestUrl = "/api/blogs";
		return axios.get(requestUrl).then(function(response){
			if(response.data.error)
				throw new Error("Server Error");	
			else			
				return response.data.blogs;
		}, function(error){
			throw new Error("Server Error");
		});
	},
	
	//get a single blogpost using it's id
	getBlogpost: function(id){		
		var requestUrl = "/api/blogs/"+id;
		return axios.get(requestUrl).then(function(response){									
			if(response.data.error)
				throw new Error("Server Error");	
			else
				return response.data.blog;			
		}, function(error){						
			throw new Error("Server Error");
		});
	},

	//create blogpost
	createBlogpost: function(blog){
		var requestUrl = "/api/blogs";						
		return axios.post(requestUrl, blog)
			.then(function(response){			
				return response.data.id;			
			},function(response){			
				throw new Error("Server Error");
			});
		
	},
	//update blogpost
	updateBlogpost: function(id, updatedBlog){
		var requestUrl = "/api/blogs/"+id;							
		return axios.put(requestUrl, updatedBlog)
			.then(function(response){					
				return response.data.id;			
			},function(response){			
				throw new Error("Server Error");
			});
		
	},
	//delete blogpost
	deleteBlogpost: function(id){		
		var requestUrl = "/api/blogs/"+id;							
		return axios.delete(requestUrl)
			.then(function(response){					
				return response.data.id;			
			},function(response){			
				throw new Error("Server Error");
			});
		
	}    

}

