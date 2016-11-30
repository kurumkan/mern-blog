var React = require('react');
var api = require('MernBlog');
var {Link} = require("react-router");

module.exports = React.createClass({
	contextTypes: {
        router: React.PropTypes.object.isRequired
    }, 

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
			_this.context.router.replace('404')
		});		
	},

	handleDelete: function(e){		
		//delete this current blogpost and redirect to main page
		var _this = this;
		
		api.deleteBlogpost(this.props.params.id)
		.then(function(id){					
			_this.context.router.replace('/');
		}, function(error){	
			_this.context.router.replace('/');
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
							<Link to={"/blogs/"+_id+"/edit"} className="btn btn-success">Edit</Link>										
							<button className="btn btn-danger" onClick={this.handleDelete} >Delete</button>							
						</div>
					</div>	
				</div>
				<div className="col-md-2"></div> 		
			</div>
		);
	}
});