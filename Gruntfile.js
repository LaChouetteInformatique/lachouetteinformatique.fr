module.exports = function(grunt) {

	grunt.initConfig({

		// https://github.com/gruntjs/grunt-contrib-clean
		clean: {
			img: [
				'dist/img/**',
				//'dist/img/static/*',
			],
			fonts: [
				'dist/fonts/**',
			],
			htaccess: [
				'dist/.htaccess'
			],
			vendors: [
				'dist/css/vendors-bundle.css',
			]
		},

		// https://github.com/jakubpawlowicz/clean-css
		// https://github.com/gruntjs/grunt-contrib-cssmin
		cssmin: {
			options: {
				format: 'keep-breaks',
			},
			vendors: {
				files: {
					['dist/css/vendors-bundle.css']: 'src/vendor/*.css',
				}
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
			fonts: {
				expand: true,
				src: 'fonts/**',
				dest: 'dist/',
				cwd:'assets/',
				//flatten: true,
				//filter: 'isFile',
			},
			htaccess: {
				expand: true,
				src: '.htaccess',
				dest: 'dist/',
				cwd:'assets/',
			}
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

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('img', ['clean:img', 'copy:static']);
	grunt.registerTask('fonts', ['clean:fonts', 'copy:fonts']);
	grunt.registerTask('security', ['clean:htaccess', 'copy:htaccess']);
	//grunt.registerTask('vendors', ['clean:vendors','cssmin:vendors']);
	grunt.registerTask('build', ['img','fonts','security'/*, 'vendors'*/]);
	grunt.registerTask('default', ['build']);

};