module.exports = function(grunt){

  grunt.initConfig({

    clean: {
      dist: ['dist']
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            src: ['**/*', '!**/.DS_Store'],
            dest: 'dist/assets/public',
            cwd: 'src/assets/public'
          }
        ]
      }
    },

    shell: {
      compile: {
        command: 'npm run build'
      }
    },

    uglify: {
      dist: {
        expand: true,
        cwd: 'dist/',
        src: ['**/*.js'],
        dest: 'dist/',
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
          'dist/**/**.css',
          'dist/**/**.js',
          '!dist/assets/public/fonts/**/**.css'
        ],
        dest: [
          'dist/**/**.html'
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
        src: 'dist',
        dest: '/'
      },
      production: {
        auth: {
          host: 'w00c7cc5.kasserver.com',
          port: 21,
          authKey: 'production'
        },
        src: 'dist',
        dest: '/'
      },
      api_staging: {
        auth: {
          host: 'w00c7cc5.kasserver.com',
          port: 21,
          authKey: 'staging'
        },
        src: 'api',
        dest: '/api',
        exclusions: ['api/storage', 'api/cache', 'api/storage/**', 'api/cache/**', 'storage', 'cache', 'storage/**', 'cache/**']
      },
      api_production: {
        auth: {
          host: 'w00c7cc5.kasserver.com',
          port: 21,
          authKey: 'production'
        },
        src: 'api',
        dest: '/api',
        exclusions: ['api/storage', 'api/cache', 'api/storage/**', 'api/cache/**', 'storage', 'cache', 'storage/**', 'cache/**', '!.htaccess', '!api/.htaccess']
      }
    },

    php: {
      dist: {
        options: {
          hostname: '127.0.0.1',
          port: 8000,
          base: 'api',
          keepalive: true,
          open: false,
          ini: 'php.ini'
        }
      }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-hashres')
  grunt.loadNpmTasks('grunt-ftp-deploy')
  grunt.loadNpmTasks('grunt-php')

  grunt.registerTask('compile', [
    'clean',
    'copy',
    'shell:compile',
    'uglify',
    'hashres'
  ])

  grunt.registerTask('ds', ['compile', 'ftp-deploy:staging', 'ftp-deploy:api_staging'])
  grunt.registerTask('dp', ['compile', 'ftp-deploy:production', 'ftp-deploy:api_production'])
  grunt.registerTask('default', ['compile'])

}
