var webpack = require('webpack');

module.exports = {
	//starting point of our app
	entry: [		
		'./views/app.jsx',
	],	
	//where to put the output
	output: {
		path: __dirname,		
		filename: './public/bundle.js'
	},
	resolve: {
		//where to lookup the files
		root:__dirname,
		alias: {	
			Main: "views/components/Main.jsx",				
			Nav: "views/components/Nav.jsx",				
			BlogList: "views/components/BlogList.jsx",				
			BlogListItem: "views/components/BlogListItem.jsx",				
			MernBlog: "views/api/MernBlog.js",				
			Blogpost: "views/components/Blogpost.jsx",	
			NewBlog: "views/components/NewBlog.jsx",	
			Form: "views/components/Form.jsx",	
			EditBlog: "views/components/EditBlog.jsx",	
			NotFound404: "views/components/NotFound404.jsx",	
		},		
		//what file extensions?
		extensions: ['', '.js','.jsx']
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	devtool: 'inline-source-map'
};	