'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            local: {
                options: {
                    base: 'public',
                    hostname: '0.0.0.0',
                    port: 9001,
                    middleware: function (connect, options) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                            // Include the proxy first
                            proxy,
                            // Serve static files.
                            connect.static('public')
                            // Make empty directories browsable.
                           // connect.directory(options.base)
                        ];
                    }
                },
                proxies: [
                    {
                        context: '/bin',
                        host: 'fahrplan.sbb.ch'
                    }
                ]
            },
        },
        watch: {
            scss: {
                options: {
                    livereload: false
                },
                files: [
                    'public/scss/**/*.scss',
                    'public/components_custom/**/*.scss',
                    'public/app/**/*.scss'
                ],
                tasks: ['sass']
            }
        },
        sass: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'public/scss/',
                    src: ['main.scss'],
                    dest: 'public/css',
                    ext: '.css'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('local', ['server:local']);
    grunt.registerTask('server', ['server:local']);
    grunt.registerTask('server:local', ['sass','configureProxies:local', 'connect:local', 'watch']);

    grunt.registerTask('default', ['local']);

};
