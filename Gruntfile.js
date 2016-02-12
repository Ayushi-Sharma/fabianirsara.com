module.exports = function(grunt){

  grunt.initConfig({

    clean: {
      dist: ['public']
    },

    shell: {
      compile: {
        command: 'npm run build'
      }
    },

    uglify: {
      dist: {
        expand: true,
        cwd: 'public/',
        src: ['**/*.js'],
        dest: 'public/',
        compress: true
      }
    },

    hashres: {
      options: {
        encoding: 'utf8',
        fileNameFormat: '${name}.${hash}.${ext}',
        renameFiles: true
      },
      assets: {
        src: [
          'public/**/**.css',
          'public/**/**.js'
        ],
        dest: [
          'public/**/**.html'
        ]
      }
    },

    'ftp-deploy': {
      staging: {
        auth: {
          host: 'w00c7cc5.kasserver.com',
          port: 21,
          authKey: 'staging'
        },
        src: 'public',
        dest: '/'
      },
      production: {
        auth: {
          host: 'w00c7cc5.kasserver.com',
          port: 21,
          authKey: 'production'
        },
        src: 'public',
        dest: '/'
      }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-hashres')
  grunt.loadNpmTasks('grunt-ftp-deploy')

  grunt.registerTask('compile', [
    'clean',
    'shell:compile',
    'uglify',
    'hashres'
  ])

  grunt.registerTask('default', ['compile'])

}
