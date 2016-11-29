var React = require('react');
var activeComponent = require('react-router-active-component')
var {IndexLink} = require("react-router");

module.exports = React.createClass({
	render: function(){		
		var NavLink=activeComponent('li');
		return (
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>      			
						<IndexLink className="navbar-brand" to="/">
							<span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span> 
							MERN Blog
						</IndexLink>
						
					</div>
					<div className="collapse navbar-collapse" id="navbar">
						<ul className="nav navbar-nav">
							<NavLink to="/" onlyActiveOnIndex>Home</NavLink>							
							<NavLink to="/blogs/new">New Blogpost</NavLink>							
						</ul>
					</div>	
				</div>
			</nav>
		);
	}
});