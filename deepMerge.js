const { mergeWith } = require("lodash");

module.exports = (object, other) =>
  mergeWith(object, other, (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });
