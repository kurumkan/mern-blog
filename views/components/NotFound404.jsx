var React = require('react');

module.exports = React.createClass({	
	render: function(){				
		return (					
		 	<div className="jumbotron text-center">
			    <h1>Page Not Found</h1>
			    <span className="text-danger">Error 404</span>
			    <p>
			    	The page you requested could not be found, either contact your webmaster or try again. 
			    	Use your browsers Back button to navigate to the page you have prevously come from
			    </p>
			    <p>Or you could just press this neat little button:</p>
			    <a href="/" className="btn btn-primary"><i className="glyphicon glyphicon-home"></i>Take Me Home</a>
		  	</div>
		);
	}
});