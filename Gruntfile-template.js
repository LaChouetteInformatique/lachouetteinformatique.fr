// https://github.com/gruntjs/grunt-contrib-connect
// https://github.com/gruntjs/grunt-contrib-imagemin
// https://github.com/gruntjs/grunt-contrib-htmlmin
// https://github.com/gruntjs/grunt-contrib-concat
// https://github.com/gruntjs/grunt-contrib-copy


// https://github.com/sass/node-sass
const node_sass = require('node-sass');


module.exports = function(grunt) {

	grunt.initConfig({
		//pkg: grunt.file.readJSON('package.json'),

		/**---------------------------------
		 *             clean
		 * 
		 * https://github.com/gruntjs/grunt-contrib-clean
		 */
		clean: {
			options: {
				//'no-write': true,
			},
			// css: [
			// 	 'dist/css/*.*',
			// 	'!dist/css/*/',
			// 	'!dist/css/vendors*.*',
			// ],
			static: [
				'dist/img/static/*',
			],
			vendors: [
				'dist/css/vendors-bundle.css',
			]
		},

		/**---------------------------------
		 *             sass
		 * 
		 * https://github.com/sass/node-sass
		 */
		sass: {
				options: {
					implementation: node_sass,
					sourceMap: true,
					outputStyle: "expanded",// nested | expanded | compact | compressed
				},
				css: {
					files: {
						['dist/css/style.css']: 'src/scss/style.scss',
					}
				}
		},

		/**---------------------------------
		 *             postcss
		 * 
		 * https://github.com/postcss/postcss
		 */
		postcss: {
			dev: {
				options: {
					map: true,
					processors: [
						// https://github.com/postcss/postcss-import
						//require("postcss-import")(), // transform @import rules by inlining content.
						// https://github.com/postcss/postcss-url
						//require("postcss-url")(), // rebase, inline or copy on url().
	
						// https://github.com/csstools/postcss-preset-env
						require('postcss-preset-env')({
							//autoprefixer: { grid: true }
						}),
						//require('cssnano')(), // minify the result
						// https://github.com/postcss/postcss-browser-reporter
						//require("postcss-browser-reporter")(), // report warning messages right in your browser.
						// https://github.com/postcss/postcss-reporter
						//require("postcss-reporter")() // console.log() the messages (warnings, etc.) registered by other PostCSS plugins.
					],
				},
				src: 'dist/css/style.css',
			},
			build: {
				options: {
					processors: [
						require('postcss-preset-env')(),
						require('cssnano')(),
					]
				},
				src: 'dist/css/main.css',
			}
		},

		/**---------------------------------
		 *             cssmin
		 * 
		 * https://github.com/jakubpawlowicz/clean-css
		 */
		cssmin: {
			options: {
				//sourceMap: true,
				format: 'keep-breaks',
			},
			vendors: {
				files: {
					['dist/css/vendors-bundle.css']: 'src/vendor/*.css',
				}
			}
		},

		/**---------------------------------
		 *         grunt-contrib-watch
		 * 				LiveReload
		 * 
		 * https://github.com/cedaro/grunt-wp-i18n
		 */
		watch: {
			options: {
				livereload: true,
				/**
				 * Enabling Live Reload in Your HTML
				 * 
				 * <script src="//localhost:35729/livereload.js"></script>
				 * 
				 * https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html
				 */

				// {
				// 	host: 'localhost',
				// 	port: 35729,
				// 	key: grunt.file.read('C:/xampp/apache/conf/ssl/lachouetteinformatique.com/lachouetteinformatique.com.key'),
				// 	cert: grunt.file.read('C:/xampp/apache/conf/ssl/lachouetteinformatique.com/lachouetteinformatique.com.crt')
				// },
			},
			scss: {
			  files: ['src/scss/*/*.scss'],
			  tasks: ['dev'],
			  options: {
					spawn: false, // 20 times faster here
			  }
			},
			html: {
				files: ['*.html']
			},
			gruntConfig: {
				files: ['Gruntfile.js'],
			}
		},


		// https://github.com/gruntjs/grunt-contrib-copy
		copy : {
			static: {
				expand: true,
				src: 'assets/img/static/*',
				dest: 'dist/img/static/',
				flatten: true,
			},
		},

		// https://www.browsersync.io/docs/grunt
		browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'dist/css/*.css',
                        'dist/*.html'
                    ]
                },
                options: {
                    //watchTask: true,
                    server: './dist'
                }
            }
        }

	});

	// https://github.com/gruntjs/grunt-contrib-clean
	grunt.loadNpmTasks('grunt-contrib-clean');
	// https://github.com/sindresorhus/grunt-sass
	grunt.loadNpmTasks("grunt-sass");
	// https://github.com/nDmitry/grunt-postcss
	grunt.loadNpmTasks('grunt-postcss');
	// https://github.com/gruntjs/grunt-contrib-cssmin
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// https://github.com/cedaro/grunt-wp-i18n
	// grunt.loadNpmTasks( 'grunt-wp-i18n' );
	// https://github.com/gruntjs/grunt-contrib-watch
	// grunt.loadNpmTasks('grunt-contrib-watch');

	// https://github.com/gruntjs/grunt-contrib-copy#grunt-contrib-copy-v100--
	grunt.loadNpmTasks('grunt-contrib-copy');

	// https://www.browsersync.io/docs/grunt
	grunt.loadNpmTasks('grunt-browser-sync');



	// grunt.registerTask('dev', [
	// 	'sass',
	// 	'postcss:dev',
	// ]);
	// grunt.registerTask('build', [
	// 	'sass',
	// 	'postcss:build',
	// ]);

	grunt.registerTask('static', ['clean:static', 'copy:static']);
	grunt.registerTask('vendors', ['clean:vendors','cssmin:vendors']);
	grunt.registerTask('build', ['static', 'vendors']);
	grunt.registerTask('default', ['build']);

};