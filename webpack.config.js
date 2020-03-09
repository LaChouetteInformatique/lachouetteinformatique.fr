/* eslint-disable no-console */
const path = require( 'path' );

// https://medium.com/@jaketripp/cool-things-with-webpack-9a8019bdbd4a

/**
 * clean-webpack-plugin
 *
 * Clean the /dist folder's content before each build
 * https://webpack.js.org/guides/output-management/#root
 * https://www.npmjs.com/package/clean-webpack-plugin
 */
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

/**
 * mini-css-extract-plugin
 *
 * extracts CSS from JS into separate files - producing js crap in the process
 * https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-css-based-on-entry
 * https://github.com/webpack-contrib/mini-css-extract-plugin/issues/45#issuecomment-425645975
 */
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

/**
 * html-webpack-plugin
 *
 * https://www.grafikart.fr/tutoriels/html-plugin-964
 * https://webpack.js.org/plugins/html-webpack-plugin/#root
 * https://javascriptplayground.com/webpack-html-plugin/
 * https://github.com/jantimon/html-webpack-plugin#options
 */
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );


/*******************************
 *
 *
 *       module.exports
 *
 *
 *******************************/

module.exports = ( env, argv ) => {

	console.log( '\n', '--- Webpack ---', '\n' );
	console.log( 'mode: ' + argv.mode ); // mode is set in package.json scripts
	const devMode = 'production' !== argv.mode;

	/**
	 * CustomHtmlWebpackPlugin
	 *
	 * If DevMode, do not minify HTML inside HtmlWebpackPluging
	 * Inspired by https://medium.com/@jaketripp/cool-things-with-webpack-9a8019bdbd4a
	 */
	function customHtmlWebpackPlugin( specificOptions ) {

		let defaults = {

			// in case we need defaults
		};

		if ( ! devMode ) {
			let productionOptions = {
				minify: {
					removeComments: true,
					collapseWhitespace: true
				}
			};
			return new HtmlWebpackPlugin({ ...defaults, ...productionOptions, ...specificOptions});
		}	else {
			return new HtmlWebpackPlugin({ ...defaults, ...specificOptions});
		}
	}


	const result = {

		externals: { // https://webpack.js.org/configuration/externals/
			//jquery: 'jQuery',
			// clipboard: 'ClipboardJS',
		},

		entry: {
			main: './src/js/main.js'
		},

		output: {
			filename: 'js/[name]-[hash:7].js',
			path: path.resolve( __dirname, 'dist/' )

			//chunkFilename: '[name]-[chunkhash].js',

			//publicPath: ASSET_PATH,
			// 2 way of using MiniCssExtractPlugin :
			// 1. extract css file to /dist folder and the css will use relative path to locate fonts and images
			// 2. extract css file to any directory and use publicPath for the css to load fonts and images correctly
			//publicPath: 'http://' + host + ':' + port + '/dist/'
			//publicPath: "/assets/",
			//publicPath: "/",
		},

		watch: devMode,
		watchOptions: {

			//poll: 1000, // If watching does not work, try this out
			aggregateTimeout: 600,

			// watchOptions.ignored
			ignored: [ '/node_modules/' /*, 'partials'*/]
		},

		plugins: [

			/**
			 * CleanWebpackPlugin
			 *
			 * A webpack plugin to remove/clean your build folder(s).
			 * https://www.npmjs.com/package/clean-webpack-plugin
			 */
			new CleanWebpackPlugin({

				//dry: true,
				//verbose: true,
				cleanOnceBeforeBuildPatterns: [
					'js/main-*.*',
					'css/main.*.*'

					// '!css/vendors-bundle.css',
					//'img/*.*',
				]

				//cleanStaleWebpackAssets: false,
			}),

			/**
			 * HTML Webpack Plugin
			 *
			 * https://www.grafikart.fr/tutoriels/html-plugin-964
			 * https://javascriptplayground.com/webpack-html-plugin/
			 * https://github.com/jantimon/html-webpack-plugin#options
			 */
			customHtmlWebpackPlugin({
				template: 'src/templates/index.template.ejs'
			}),

			// new HtmlWebpackPlugin({ // Generates default index.html
			//   //filename: 'assets/roger.html',
			//   template: 'src/templates/index.template.ejs',
			//   //inject: 'body', // inject js into <body> rather then <head>
			//   //hash: true,
			//   // favicon: 'src/img/portrait64x64.png',
			//   minify: {
			//     removeComments: true,
			//     collapseWhitespace: true
			//   },
			// }),
			// new HtmlWebpackPlugin({  // Also generate a test.html
			//   filename: 'test.html',
			//   template: 'src/assets/test.html'
			// }),


			new MiniCssExtractPlugin({

				//filename: 'css/[name].css',
				//chunkFilename: "css/[name].css",
				filename: 'css/[name].[hash:7].css',
				chunkFilename: 'css/[name].[hash:7].css'

			/**
			 * Hot Module Replacement
			 *
			 * https://webpack.js.org/guides/hot-module-replacement/
			 *
			 */
			// TODO: Get this thing working somehow instead of relying on grunt browserSync
			//new webpack.HotModuleReplacementPlugin()
			})
		],


		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader'

						// use .babelrc configuration file
						// and browserslist from package.json instead of .browserslistrc
						// https://github.com/browserslist/browserslist
					}
				},
				{
					test: /\.(css|sass|scss)$/,
					exclude: /node_modules/,

					use: [

						// Reverse order : The first loader used by webpack is the last one

						// Extract the css from the js : creates a CSS file per JS file which contains CSS
						// https://github.com/webpack-contrib/mini-css-extract-plugin
						{ loader: MiniCssExtractPlugin.loader }, // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,

						// The css-loader interprets @import and url() like import/require() and will resolve them
						// https://github.com/webpack-contrib/css-loader
						{ loader: 'css-loader', options: {importLoaders: 1} },

						// PostCSS is a tool for transforming CSS with JavaScript
						{ loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								sourceMap: true,

								plugins: ( /*loader*/ ) => {
									let postcssPlugins = [

										// Add vendor prefixes to CSS rules using values from Can I Use
										// Autoprefixer will use the data based on current browser popularity
										// and property support to apply prefixes for you
										// https://github.com/postcss/autoprefixer
										require( 'autoprefixer' )()
									];

									// Css Minifier https://cssnano.co/
									if ( ! devMode ) {
										postcssPlugins.push( require( 'cssnano' )() );
									}
									return postcssPlugins;
								},

								config: {
									ctx: {
										cssnano: {},
										autoprefixer: {}
									}
								}
							}
						},

						// Loads a Sass/SCSS file and compiles it to CSS
						// https://github.com/webpack-contrib/sass-loader
						{ loader: 'sass-loader',
							options: {
								sourceMap: true // must be true for postcss to work correctly
							}}
					]
				},
				{
					test: /\.(png|svg|jpe?g|gif)$/,
					exclude: /(node_modules|fonts)/,

					//exclude: /node_modules\/(?!(MY-MODULE|ANOTHER-ONE)\/).*/,
					use: [

						/**
							 * url-loader
							 *
							 * A loader for webpack which transforms files into base64 URIs
							 * https://www.npmjs.com/package/url-loader
							 */
						{
							loader: 'url-loader',
							options: {
								limit: 8192,

								// https://stackoverflow.com/questions/40580968/unexpected-path-in-file-loader/46931670#46931670
								//context: path.resolve(__dirname, 'src'),
								name: 'img/[name].[ext]', /*.[hash:7]*/
								//emitFile: false,
								/* Public path is requiered because :
									 *    new MiniCssExtractPlugin({
									 *    filename: 'css/[name].[hash:7].css'...
									 */
								publicPath: '/'

								/* Needed because MiniCssExtractPlugin filename is configured with a subfolder (css)
									* that would otherwise be injected in the image ressource path and break the link */
							}
						}
					]
				}, // svg
				{
					test: /\.(woff|woff2|eot|ttf|otf|svg)$/,

					//test: /^[^\/]+\/fonts\/?(?:[^\/]+\/?)*.(woff|woff2|eot|ttf|otf|svg)$/gm,
					exclude: /(node_modules|img)/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'fonts/[name].[ext]' /*.[hash:7]*/
							}
						}
					]
				}
			]
		}
	};

	// In devMode, add devtool option to the config before returning it
	// => no source map in production
	if ( devMode ) {

		// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/assign
		Object.assign( result, {

			// https://webpack.js.org/configuration/devtool/
			// https://webpack.js.org/guides/development/#using-source-maps
			devtool: 'source-map'
		});
	}

	return result;
};

