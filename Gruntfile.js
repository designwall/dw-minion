'use strict';
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var jsFileList = [
    'dev/vendor/bootstrap/js/bootstrap-transition.js',
    'dev/vendor/bootstrap/js/bootstrap-alert.js',
    'dev/vendor/bootstrap/js/bootstrap-button.js',
    'dev/vendor/bootstrap/js/bootstrap-carousel.js',
    'dev/vendor/bootstrap/js/bootstrap-collapse.js',
    'dev/vendor/bootstrap/js/bootstrap-dropdown.js',
    'dev/vendor/bootstrap/js/bootstrap-modal.js',
    'dev/vendor/bootstrap/js/bootstrap-tooltip.js',
    'dev/vendor/bootstrap/js/bootstrap-popover.js',
    'dev/vendor/bootstrap/js/bootstrap-scrollspy.js',
    'dev/vendor/bootstrap/js/bootstrap-tab.js',
    'dev/vendor/bootstrap/js/bootstrap-affix.js',
    'dev/assets/js/iscroll.js',
    'dev/assets/js/main.js',
    ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'dev/js/**'
      ]
    },

    less: {
      build: {
        files: {
          'dist/assets/css/<%= pkg.name %>.min.css': [
            'dev/assets/css/main.css',
          ]
        },
        options: {
          compress: false,
          sourceMap: true,
          sourceMapFilename: 'dist/assets/css/<%= pkg.name %>.css.map'
        }
      },

      dev: {
        files: {
          'dist/assets/css/<%= pkg.name %>.css': [
            'dev/assets/css/main.css',
          ]
        },
        options: {
          compress: true
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'dist/assets/js/<%= pkg.name %>.js',
      },
    },

     uglify: {
       scripts: {
        files: {
          'dist/assets/js/dw-minion.min.js': [jsFileList]
        }
      },
      modernizr: {
         files: {
          'dist/assets/js/modernizr.js': ['dev/vendor/modernizr/modernizr.js',]
        }
      }
    },
    watch: {
      less: {
        files: [
          'dev/assets/css/**'
        ],
        tasks: ['less:dev', 'less:build']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['concat', 'uglify']
      },
      livereload: {
        options: {
          livereload: false
        },
        files: [
          'dist/assets/css/**',
          'dist/assets/js/**',
          'dist/*.php'
        ]
      }
    },

    compress: {
      main: {
        options: {
          archive: 'release/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [
          { expand: true, cwd: 'dist/', src: ['**'], dest: '<%= pkg.name %>/' }
        ]
      }
    },
    copy: {
    	assets: {
        files: [
         { expand: true, cwd: 'dev/vendor/fontawesome/fonts/', src: ['**'], dest: 'dist/assets/fonts', filter: 'isFile' },
        ],
      },
      demo: {
        expand: true,
        cwd: 'dist/',
        src: ['**'],
        dest: 'demo/'
      }
    },

    git_deploy: {
      demo: {
        options: {
          url: '<%= pkg.repository.url %>',
          branch: 'demo',
          message: 'Export theme to demo <%= pkg.name %> <%= pkg.version %>'
        },
        src: 'demo'
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev',
  ]);
  grunt.registerTask('dev',[
    'copy:assets',
    'less',
    'uglify',
    'jshint',
  ]);
  grunt.registerTask('build', [
    'copy:assets',
    'less',
    'uglify',
    'jshint',
    'less:build',
    ]);
  grunt.registerTask('export_release', [
    'copy:assets',
  	'modernizr',
    'less',
    'uglify',
    'concat',
    'compress',
  ]);
  grunt.registerTask('export_demo', [
  	'modernizr',
    'less',
    'uglify',
    'concat',
    'copy:demo',
    'git_deploy:demo'
  ]);
};
