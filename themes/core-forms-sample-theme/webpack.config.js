const {webpackConfig} = require("@coremedia/theme-utils");
const deepMerge = require("@coremedia/theme-utils/configs/utils/deepMerge");

module.exports = (env, argv) => {
  const config = webpackConfig(env, argv);

  deepMerge(config, {
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        'vue$': 'vue/dist/vue.min.js'
      }
    },
    module: {
      rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        }
      }]
    }
  });

  return config;
};

