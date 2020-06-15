/* eslint-disable no-console */
/* eslint-disable lines-around-comment */
/**
 * COMMAND LINE : --mode=?
 * ----------------------
 * grunt
 * grunt --mode=robert
 *
 * Not specifying mode will trigger 'production' mode
 * Anything else than '--mode=production' will trigger 'development' mode
 */

module.exports = grunt => {

	console.log( '\n', '--- Grunt ---', '\n' );
	const devMode = ( 'production' !== ( grunt.option( 'mode' ) || 'production' ) );
	console.log( 'mode = ' + ( devMode ? 'development' : 'production' ) );

	require( 'load-grunt-tasks' )( grunt ); // https://github.com/sindresorhus/load-grunt-tasks

	grunt.initConfig({

		clean: { // https://github.com/gruntjs/grunt-contrib-clean
			img: [
				'dist/img/**'
			],
			fonts: [
				'dist/fonts/**'
			],
			htaccess: [
				'dist/.htaccess'
			]
		},

		copy: { // https://github.com/gruntjs/grunt-contrib-copy
			static: {
				expand: true,
				src: 'assets/img/static/*',
				dest: 'dist/img/static/',
				flatten: true
			},
			fonts: {
				expand: true,
				src: 'fonts/**',
				dest: 'dist/',
				cwd: 'assets/'
			},
			htaccess: {
				expand: true,
				src: '.htaccess',
				dest: 'dist/',
				cwd: 'assets/'
			}
		},

		browserSync: { // https://www.browsersync.io/docs/grunt
			bsFiles: {
				src: [
					'dist/css/*.css',
					'dist/*.html'
				]
			},
			options: {
				//watchTask: true,
				server: './dist'
			}
		}

	});

	grunt.registerTask( 'img', [ 'clean:img', 'copy:static' ]);
	grunt.registerTask( 'fonts', [ 'clean:fonts', 'copy:fonts' ]);
	grunt.registerTask( 'security', [ 'clean:htaccess', 'copy:htaccess' ]);

	grunt.registerTask( 'default', [ 'img', 'fonts', 'security' ]);
};
