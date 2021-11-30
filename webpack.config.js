const webpack = require("@nativescript/webpack");

module.exports = (env) => {
  webpack.chainWebpack((config) => {
    config.resolve.set("fallback", {
      os: false,
      tty: false,
      assert: false,
      stream: false,
      https: false,
      http: false,
      url: false,
      util: false,
      zlib: false,
    });
  });
  webpack.init(env);
  return webpack.resolveConfig();
};
