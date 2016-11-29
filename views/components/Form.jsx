var React = require('react');

module.exports = React.createClass({	
	
	render: function(){				
		return (						
			<div className="row">
				<h1 className="text-center">{this.props.title}</h1>
				<div className="col-md-3"></div>
				<div className="col-md-6">		
					<form onSubmit={this.props.handleSubmit}>
						<div className="form-group">
							<label htmlFor="title">Title:</label>
							<input value={this.props.values.title} onChange={this.props.handleChange('title')} type="text" name="title" className="form-control" id="title" placeholder="Title" />
						</div>
						<div className="form-group">
							<label htmlFor="image">Image Url:</label>
							<input value={this.props.values.image} onChange={this.props.handleChange('image')} type="text" name="image" className="form-control" id="image" placeholder="Image url" />
						</div>
						<div className="form-group">
							<label htmlFor="body">Your Post</label>
			  				<textarea value={this.props.values.body} onChange={this.props.handleChange('body')} className="form-control" name="body" rows="5" id="body" placeholder="Type here something"  />
						</div>			
						<button type="submit" className="btn btn-success">Save</button>
						<a href="/" className="btn btn-default">Cancel</a>
					</form>
				</div>
				<div className="col-md-3"></div>
			</div>
		);
	}
});