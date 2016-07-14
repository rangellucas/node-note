module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/javascripts/scripts.min.js': ['src/js/tether.js','src/js/bootstrap.js','src/js/scripts.js'],
          'public/javascripts/jquery.min.js': ['src/js/jquery.js']
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'public/stylesheets/styles.min.css': ['src/**/*.css']
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'src/**/*.css','src/**/*.js'],
      tasks: ['jshint','uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('task-minify', ['uglify','cssmin']);
  grunt.registerTask('task-watch', ['watch','jshint']);
  grunt.registerTask('default', ['jshint']);

};