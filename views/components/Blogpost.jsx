var React = require('react');
var api = require('MernBlog');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			blog: null
		};
	},
	componentWillMount: function(){
		var _this = this;
		var id = this.props.params.id;		

		//getting a single blog post and setting it as state		
		api.getBlogpost(id).then(function(blog){					
				_this.setState({
					blog: blog
				});							
			}, function(error){		
			//redirect to NotFound404 component			
			window.location.hash="#/404";	
		});		
	},

	handleDelete: function(e){		
		//delete this current blogpost and redirect to main page
		api.deleteBlogpost(this.props.params.id)
		.then(function(id){					
			window.location.hash="#/";								
		}, function(error){	
			window.location.hash="#/";													
		});		
	},

	render: function(){	
	    var blog = this.state.blog;	
		if(!blog)
			return <h3 className="text-center">Loading ...</h3>;
		
		var {title, image, body, _id} = blog;		
		
		return (
			<div className="row">		
				<div className="col-md-2"></div>
				<div className="col-md-8">
					<div className="panel panel-default">
						<div className="panel-body">
							<h1>{title}</h1>
							<img src={image} className="img-responsive" />
							<p>
								{body}
							</p>
						</div>
						<div className="panel-footer text-right">
							<a href={"/#/blogs/"+_id+"/edit"} className="btn btn-default">Edit</a>	
							<button className="btn btn-danger" onClick={this.handleDelete} >Delete</button>							
						</div>
					</div>	
				</div>
				<div className="col-md-2"></div> 		
			</div>
		);
	}
});