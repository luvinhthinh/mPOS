/**
 * Created by User on 9/23/2015.
 */
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            'build/*'
                        ]
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: [
                    'app/js/domain.js',
                    'app/js/data.js',
                    'app/js/helpers/utility.js',
                    'app/js/helpers/cart.js',
                    'app/js/helpers/transaction.js',
                    'app/js/controllers/time-controller.js',
                    'app/js/controllers/page-controller.js',
                    'app/js/controllers/setup-controller.js',
                    'app/js/controllers/menu-controller.js',
                    'app/js/controllers/payment-controller.js',
                    'app/js/controllers/report-controller.js',
                    'app/js/controllers/main-controller.js'
                ],
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('minified', [
        'clean:dist',
        'uglify'
    ]);
};