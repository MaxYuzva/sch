module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            css: {
                src: ["./public/css/wm-framework-header-footer.css", "./public/css/wm-framework.css", "./public/css/wm-work.css", "./public/css/adapt-img.css", "./public/css/other.css"],
                dest: './public/dist/concat.css'
            },
            css_mobile: {
                src: ["./public/css/wm-framework-header-footer-mobile.css", "./public/css/wm-framework-mobile.css", "./public/css/wm-work-mobile.css"],
                dest: './public/dist/concat_mobile.css'
            }
        },
        cssmin: {
            css: {
                src: './public/dist/concat.css',
                dest: './public/dist/concat.min.css'
            },
            css_mobile: {
                src: './public/dist/concat_mobile.css',
                dest: './public/dist/concat_mobile.min.css'
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: {
                './public/index.html':'./public/index.html'
            }
        }
    });
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');


    // Default task.
    grunt.registerTask('default', ['concat', 'cssmin']);
    grunt.registerTask('minifyhtml', ['htmlmin']);

};