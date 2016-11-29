module.exports = {	
	//handle internal errors
	handle500: function(response, error){
		console.log(error.stack);
		response.status(500);
		response.json({error: "error: internal server error"});		
	}
}