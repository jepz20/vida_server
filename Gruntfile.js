'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['gruntfile.js', 'app.js', 'app/**/*.js', 'config/**/*','test/**/*'],
                tasks: ['jshint','mochaTest']
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
            script: 'app.js',
            options: {
              args: ['dev'],
              nodeArgs: ['--debug'],
              env: {
                PORT: '2222'
              },
              cwd: __dirname,
              ignore: ['node_modules/**'],
              ext: 'js',
              delay: 1,
              legacyWatch: true
            }
          }
        },
        concurrent: {
            tasks: ['watch','nodemon'],
            options: {
                logConcurrentOutput: true
            }
        },
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
        // },
        plato: {
          your_task: {
            options : {
              jshint : false
            },
            files: {
              'reports': ['app/**/*.js']
            }
          }
        },
        mochaTest: {
          test: {
            options: {
              reporter: 'spec'
            },
            src: ['test/**/*.js']
          }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-mocha-test');
    // grunt.loadNpmTasks('grunt-karma');
    // grunt.loadNpmTasks('grunt-env');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);

    //Test task.
    grunt.registerTask('test', [/*'env:test', */'mochaTest'/*,'plato'*//*, 'karma:unit'*/]);
};
