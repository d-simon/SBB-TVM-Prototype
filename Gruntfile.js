'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            local: {
                options: {
                    base: 'public',
                    hostname: '0.0.0.0',
                    port: 9001
                }
            }
        },
        watch: {
            scss: {
                options: {
                    livereload: false
                },
                files: ['public/scss/main.scss'],
                tasks: ['sass']
            }
        },
        sass: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'public/scss/',
                    src: ['*.scss'],
                    dest: 'public/css',
                    ext: '.css'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('local', ['server:local']);
    grunt.registerTask('server', ['server:local']);
    grunt.registerTask('server:local', ['sass', 'connect:local', 'watch']);

    grunt.registerTask('default', ['local']);

};
