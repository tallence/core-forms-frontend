const {babelConfig: babelConfig} = require("@coremedia/theme-utils");
const deepMerge = require("@coremedia/theme-utils/configs/utils/deepMerge");

module.exports = api => {
  const config = babelConfig(api);
  deepMerge(config, {
      //optional babel config required?
  });
  return config;
};
