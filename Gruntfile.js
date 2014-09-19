'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['gruntfile.js', 'app.js', 'app/**/*.js', 'config/**/*'],
                tasks: ['jshint']
            }
            // ,
            // html: {
            //     files: ['public/views/**'],
            //     options: {
            //         livereload: true,
            //     },
            // },
            // css: {
            //     files: ['public/css/**'],
            //     options: {
            //         livereload: true
            //     }
            // }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'app.js', 'app/**/*.js', 'config/js/**'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    watchedExtensions: ['js'],
                    ignoredFiles: ['node_modules/**'],
                    nodeArgs: ['--debug'],
                    delayTime: 100,
                    env: {
                        PORT: 2222
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
        // ,
        // mochaTest: {
        //     options: {
        //         reporter: 'spec',
        //         require: 'server.js'
        //     },
        //     src: ['test/mocha/**/*.js']
        // },
        // env: {
        //     test: {
        //         NODE_ENV: 'test'
        //     }
        // },
        // karma: {
        //     unit: {
        //         configFile: 'test/karma/karma.conf.js'
        //     }
        // }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    // grunt.loadNpmTasks('grunt-mocha-test');
    // grunt.loadNpmTasks('grunt-karma');
    // grunt.loadNpmTasks('grunt-env');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);

    //Test task.
    // grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};
