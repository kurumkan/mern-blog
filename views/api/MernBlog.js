var axios = require('axios');

module.exports = {
	getBlogs: function(){
		var requestUrl = "/api/blogs";
		return axios.get(requestUrl).then(function(response){									
			return response.data.blogs;			
		}, function(error){						
			throw new Error("Server Error");
		});
	},
	getBlogpost: function(id){		
		var requestUrl = "/api/blogs/"+id;
		return axios.get(requestUrl).then(function(response){									
			return response.data.blog;			
		}, function(error){						
			throw new Error("Server Error");
		});
	},
	createBlogpost: function(blog){
		var requestUrl = "/api/blogs";						
		return axios.post(requestUrl, blog)
			.then(function(response){			
				return response.data.id;			
			},function(response){			
				throw new Error("Server Error");
			});
		
	} 
}

