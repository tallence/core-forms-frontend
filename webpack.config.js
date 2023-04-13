const webpack = require("webpack")
const {webpackConfig} = require("@coremedia/theme-utils")
const deepMerge = require("./deepMerge")
const {vueWebpackConfig, vueDefineOptions} = require('./src/vue/webpack/webpack.vue.config')

module.exports = (env, argv) => {
  const config = webpackConfig(env, argv)

  const isProductionBuild = (argv.mode || 'production') === 'production'

  deepMerge(config, vueWebpackConfig(config, isProductionBuild))

  config.plugins = config.plugins || []
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProductionBuild ? 'production' : 'development')
      },
      ...vueDefineOptions(isProductionBuild)
    })
  )

  return config
}

