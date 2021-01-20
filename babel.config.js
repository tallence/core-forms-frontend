const {babelConfig: babelConfig} = require("@coremedia/theme-utils");
const deepMerge = require("./deepMerge");

module.exports = api => {
  const config = babelConfig(api);
  deepMerge(config, {
      //optional babel config required?
  });
  return config;
};
