// 导入node的核心模块
const path = require('path')
// 导入用户定义的模块
const { defineConfig } = require('@vue/cli-service')

// 导出配置对象
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, './src'))
      .set('assets', path.join(__dirname, './src/assets'))
      .set('images', path.join(__dirname, './src/assets/images'))
      .set('styles', path.join(__dirname, './src/assets/styles'))
  },
})
