'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            local: {
                options: {
                    base: 'public',
                    hostname: '0.0.0.0',
                    port: 9001,
                    keepalive: true
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('local', ['server:local']);
    grunt.registerTask('server', ['server:local']);
    grunt.registerTask('server:local', ['connect:local']);

    grunt.registerTask('default', ['local']);

};
