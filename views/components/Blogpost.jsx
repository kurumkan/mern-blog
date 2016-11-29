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
		api.getBlogpost(id).then(function(blog){					
				_this.setState({
					blog: blog
				});							
			}, function(error){	
				console.log("error", error.message)								
		});		
	},
	render: function(){	
	    var blog = this.state.blog;	
		if(!blog)
			return <div>Loading ...</div>;
		
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
							<a href={"/blogs/"+_id+"/edit"} className="btn btn-default">Edit</a>	
							<form  className="delete-form" method="POST" action={"/api/blogs/"+_id+"?_method=DELETE"}>
								<button className="btn btn-danger">Delete</button>
							</form>							
						</div>
					</div>	
				</div>
				<div className="col-md-2"></div> 		
			</div>
		);
	}
});