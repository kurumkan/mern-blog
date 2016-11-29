var React = require('react');
var BlogListItem = require('BlogListItem');
var api = require('MernBlog');
module.exports = React.createClass({
	getInitialState: function(){
		return {
			blogs: [],
			error: null
		}	
	},

	componentWillMount: function(){
		var _this = this;
		api.getBlogs().then(function(blogs){			
				_this.setState({
					blogs: blogs
				});							
			}, function(error){									
				_this.setState({
					error: "Sorry, something went wrong. We are working on it"
				});
		});		
	},

	render: function(){		
		var {error} = this.state;
		//if error occured in api.getBlogs - then render the error message
		function renderError(){					
			if(error){				
				return (
					<div className="alert alert-danger" role="alert">
						{error}
					</div>
				)
			}		
		}

		const blogs = this.state.blogs.map((blog, i)=>{
			return <BlogListItem blog={blog} key={i} />;
		});

		return (
			<div className="row">		
				<div className="col-md-3"></div>
				<div className="col-md-6">
					{renderError()}
					<h1>Blog Posts</h1>					
					{blogs}				
				</div>
				<div className="col-md-3"></div>				
			</div>
		);
	}
});