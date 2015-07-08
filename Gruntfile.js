module.exports = function (grunt) {
	grunt.initConfig({
		shell: {
			server: {
				command: 'java -cp L1.2-1.0-jar-with-dependencies.jar main.Main 8002'
			}
		},
		fest: {
			templates: {
				files: [{
					expand: true,
					cwd: 'templates',
					src: '*.xml',
					dest: 'public_html/js/tmpl'
				}],
				options : {
					template: function (data) {
						return grunt.template.process(
							'var <%= name %>Tmpl = <%= contents %> ;',
								{data: data}
						);
					}
				}
			}
		},
		watch: {
			fest: {
				files: ['templates/*.xml'],
				tasks: ['fest'],
				options: {
					atBegin: true
				}
			},
			server: {
				files: ['public_html/js/**/*.js'],
				options: {
					livereload: true
				}
			}
		},
		concurrent: {
			target: ['watch', 'shell'],
			options: {
				logConcurrentOutput: true
			}
		}

	});
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.registerTask('default', ['concurrent']);
};
