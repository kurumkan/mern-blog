var React = require('react');
var BlogListItem = require('BlogListItem');
var api = require('MernBlog');
module.exports = React.createClass({
	getInitialState: function(){
		return {
			blogs: []
		}	
	},

	componentWillMount: function(){
		var _this = this;
		api.getBlogs().then(function(blogs){			
				_this.setState({
					blogs: blogs
				});							
			}, function(error){	
				console.log("error", error.message)								
		});		
	},

	render: function(){		
		const blogs = this.state.blogs.map((blog, i)=>{
			return <BlogListItem blog={blog} key={i} />;
		});
		return (
			<div className="row">		
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<h1>Blog Posts</h1>
					{blogs}				
				</div>
				<div className="col-md-3"></div>				
			</div>
		);
	}
});