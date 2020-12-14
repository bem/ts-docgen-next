const path = require("path");
const webpack = require("webpack");

function compiler(fixture, options = {}) {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx/,
          use: {
            loader: path.resolve(__dirname, "../index.js"),
            options,
          },
        },
      ],
    },
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors));
      resolve(stats);
    });
  });
}

module.exports = compiler;
