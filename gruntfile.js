const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  grunt.initConfig({
    clean: {
      temp: 'temp/**' // 删除temp下面的所有子目录和子目录所有的文件
    },
    sass: {
      options: {
        sourceMap: true,
        implementation: sass // 用来指定sass编译的模块
      },
      main: {
        files: {
          'dist/css/main.css': 'src/assets/styles/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env'] // 需要转换的es新特性
      },
      main: {
        files: {
          'dist/js/app.js': 'src/assets/scripts/main.js'
        }
      }
    },
    swig: {
      options: {
        defaultContext: {
          pageTitle: 'outputIndex'
        },
        templatesDir: 'src/'
      },
      development: {
        dest: 'dist/pages/',
        src: ['src/*.html']
      }
    },
    watch: {
      js: {
        files: ['src/assets/scripts/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/assets/styles/*.scss'], // scss是sass的新的语法规范的扩展名
        tasks: ['sass']
      },
      pages: {
        files: ['src/*'],
        tasks: ['swig']
      }
    }
  })
  
  grunt.loadNpmTasks('grunt-contrib-clean')

  // grunt.loadNpmTasks('grunt-sass')
  loadGruntTasks(grunt) // 自动加载所有的 grunt 插件中的任务

  grunt.registerTask('default', ['sass', 'babel', 'swig', 'watch'])
}