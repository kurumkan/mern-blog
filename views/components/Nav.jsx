var React = require('react');

module.exports = React.createClass({
	render: function(){
		return (
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>      			
						<a className="navbar-brand" href="/"><span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span> MERN Blog</a>
					</div>
					<div className="collapse navbar-collapse" id="navbar">
						<ul className="nav navbar-nav">
							<li className="active"><a href="/">Home</a></li>
							<li><a href="/#/blogs/new">New Post</a></li>				
						</ul>
					</div>	
				</div>
			</nav>
		);
	}
});