const deepMerge = require("../../../deepMerge")
const {VueLoaderPlugin} = require('vue-loader')

/**
 * this config adds all vue specific build instructions.
 *
 * @param config existing webpack config
 * @param isProductionBuild target
 * @returns {*}
 */
const vueWebpackConfig = (config, isProductionBuild) => {

  const vueDistFile = isProductionBuild ? 'vue/dist/vue.runtime.esm-bundler.js' : 'vue/dist/vue.esm-bundler.js'

  deepMerge(config, {
    plugins: [
      new VueLoaderPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {importLoaders: 1}
            }
          ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              'sass|scss|css': [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
              ]
            },
            compilerOptions: {
              COMPILER_V_BIND_OBJECT_ORDER: false,
              whitespace: 'preserve'
            }
          }
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    },
    resolve: {
      alias: {
        'vue': vueDistFile
      },
      extensions: ['*', '.js', '.vue', '.json']
    }
  })

  return config
}

const vueDefineOptions = (isProductionBuild) => {
  return {
    __VUE_PROD_DEVTOOLS__: !isProductionBuild,
    __VUE_DEVTOOLS_PLUGINS__: !isProductionBuild,
    __VUE_OPTIONS_API__: true
  }
}

module.exports = {vueDefineOptions, vueWebpackConfig}
