module.exports = function(grunt) {

	grunt.initConfig({

		// https://github.com/gruntjs/grunt-contrib-clean
		clean: {
			img: [
				'dist/img/**',
				//'dist/img/static/*',
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
	//grunt.registerTask('vendors', ['clean:vendors','cssmin:vendors']);
	grunt.registerTask('build', ['img' /*, 'vendors'*/]);
	grunt.registerTask('default', ['build']);

};