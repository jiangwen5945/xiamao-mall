const { defineConfig } = require('@vue/cli-service') // 帮手函数，以获得更好的类型提示
const path = require('path')
// 文档说明：https://next.cli.vuejs.org/zh/config/#vue-config-js
module.exports = defineConfig({
  // 部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  transpileDependencies: true, // 转译第三方依赖
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  // 调整 webpack 配置
  configureWebpack: {
    plugins: [],
    externals: {
      qc: 'QC'
    }
  },
  // 传递任何第三方插件选项
  pluginOptions: {
    // 完成自动注入到每个less文件或者vue组件中style标签中
    'style-resources-loader': {
      preProcessor: 'less',
      // 配置需要注入的文件
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  // 对内部的 webpack 配置进行更细粒度的修改
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '瞎猫商城'
      return args
    })
  },
  // webpack-dev-server开启IP和域名访问权限
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all'
  }
})
