var React = require('react');
var Form = require('Form');
var api = require('MernBlog');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			title: "",
			body: "",
			image: ""
		}			
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
			api.createBlogpost(blogPost).then(function(id){
				window.location.hash="#/blogs/"+id;				
			}, function(error){				
				window.location.hash="#/blogs";
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
		return <Form title="New Blogpost" values={values} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
	}
});