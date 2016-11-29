var React = require("react");
var ReactDOM = require("react-dom");
var {Route, Router, IndexRoute, hashHistory} = require("react-router");
var Main = require("Main");
var BlogList = require('BlogList');
var Blogpost = require('Blogpost');
var NewBlog = require('NewBlog');
var EditBlog = require('EditBlog');
var NotFound404 = require('NotFound404');
ReactDOM.render(
	<Router history={hashHistory}>	
		<Route path="/" component={Main}>
			<IndexRoute component={BlogList} />		
			<Route path="blogs/new" component={NewBlog} />			
			<Route path="blogs/:id/edit" component={EditBlog} />						
			<Route path="blogs/:id" component={Blogpost} />	
			<Route path='404' component={NotFound404} />
			<Route path='*' component={NotFound404} />			
		</Route>		
	</Router>, 

	document.getElementById("app")
);