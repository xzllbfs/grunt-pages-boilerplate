const { parallel, series } = require('gulp')

const { style, script, page, clean } = require('./base.config')
const { devServer } = require('./dev.config')
const { image, font, extra, useref } = require('./prod.config')

// 合并编译任务
const compile = parallel(style, script, page)

// 合并生产环境任务
const build = series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

// 合并开发环境任务
const serve = series(compile, devServer)

module.exports = {
  clean,
  build,
  serve
}
