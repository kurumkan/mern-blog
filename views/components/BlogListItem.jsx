var React = require('react');
var moment = require('moment');
var {Link} = require("react-router");

module.exports = React.createClass({	
	render: function(){
		var {title, image, created, body, _id} = this.props.blog;				
		return (
			<div className="panel panel-default">		
				<div className="panel-body">
					<div className="row">
						<div className="col-xs-5">
							<img src={image} className="img-responsive" />
						</div>
						<div className="col-xs-7">
							<h3>								
								<Link to={"/blogs/"+_id}>{title}</Link>			
							</h3>
							<p className="date">
								{moment.utc(created).format("MMMM D, YYYY")}
							</p>
							<p>
								{body.substring(0,30)}...
							</p>																																																																																		
						</div>
					</div>
				</div>
			</div>					
		);
	}
});