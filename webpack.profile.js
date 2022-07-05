const { merge } = require("webpack-merge");
const prod = require("./webpack.prod.js");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(prod, {
  //定义环境为生产环境
  mode: "production",
  plugins: [new BundleAnalyzerPlugin()],
});
