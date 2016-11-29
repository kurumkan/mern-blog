var React = require("react");
var Nav = require('Nav');
module.exports = (props)=>{
	return (
		<div>
			<Nav/>			
			<div className="container">				
				{props.children}				
			</div>
		</div>	
	);
}
