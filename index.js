const tsdocgen = require("./lib/parser");

module.exports = function() {
  let value = [];
  try {
    value = tsdocgen.parse(this.resourcePath);
  } catch (error) {
    console.log("Error in ts-docgen-loader", error);
  }
  return `module.exports = ${JSON.stringify(value)}`;
};
