module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  //var ROOT_PATH = require('path').resolve();
  var ROOT_PATH = 'http://localhost/moon';
  var DIST_PATH = 'http://localhost/moon/dist';
  var PUBLIC_PATH = 'http://localhost/moon/public';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), 
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded',
          lineNumbers:true
        },
        files: {
          'style.css': 'sass/style.scss'
        }
      }
    },

    uglify: {
      my_target: {
        options: {
          beautify: true
        },
        files: {
          'moon.min.js': ['js/**/*.js']
        }
      }
    },

    concat_css: {
      options: {
        // Task-specific options go here. 
      },
      all: {
        src: ["dist/css/**/*.css"],
        dest: "dist/style.min.css"
      },
    },


    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'public/image/', src: ['**/*'], dest: 'dist/image', filter: 'isFile'},
          {expand: true, cwd: 'public/fonts/', src: ['**/*'], dest: 'dist/fonts', filter: 'isFile'},
          {expand: true, cwd: 'public/css/', src: ['**/*'], dest: 'dist/css', filter: 'isFile'},
        ],
      },
    },


    watch: {
      options: {
        livereload: true,
      },
      styles: {
        files: ['sass/**/*.scss','**/*.php','js/**/*.js','wphy.js'], // which files to watch
        tasks: ['sass','uglify'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['watch','uglify','sass']);
};