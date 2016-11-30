var React = require('react');
var Form = require('Form');
var api = require('MernBlog');

module.exports = React.createClass({
	contextTypes: {
        router: React.PropTypes.object.isRequired
    }, 
	getInitialState: function() {
		return {
			title: "",
			body: "",
			image: "",
			id: null
		}			
	},

	componentWillMount: function() {		
		var _this = this;
		var id = this.props.params.id;		
		api.getBlogpost(id).then(function(blog){					
				_this.setState({
					title: blog.title,
					body: blog.body,
					image: blog.image,
					id: id
				});							
			}, function(error){	
				//redirect to NotFound404 component			
				_this.context.router.replace('404')
		});		
	},

	handleSubmit: function(e){
		e.preventDefault();
		var {title, body, image} = this.state;
		
		if(title&&body&&image){
			
			var blogPost={
				title: title,
				image: image,
				body: body
			};			
			var id = this.state.id;
			var _this=this;
			api.updateBlogpost(id, blogPost).then(function(data){
				_this.context.router.replace('/blogs/'+id);				
			}, function(error){
				_this.context.router.replace('/');
			});
		}		
	},

	handleChange: function(key){
		return function (e) {
			var state = {};
			state[key] = e.target.value;
			this.setState(state);
	    }.bind(this);
	},

	render: function(){		
		var values={
			title: this.state.title,
			body: this.state.body,
			image: this.state.image
		};
		return <Form title="Edit Blogpost" values={values} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
	}
});