const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");

module.exports = merge(base, {
  //定义环境为生产环境
  mode: "production",
  optimization: {
    moduleIds: "deterministic", // 推荐加上，有利于长期缓存。
    runtimeChunk: "single", // 将 main.js 运行在浏览器上所需的运行时代码
    splitChunks: {
      cacheGroups: {
        vendor: {
          minSize: 0, // 这里单纯为了单独打包 React (vendor.xxx.js) 由于 React 只有 7 KB 还是太小了。
          test: /[\\/]node_modules[\\/]/, // 同时匹配 /node_modules/ 以及 \node_modules\
          name: "vendors", // vendors 是 第三方的意思
          chunks: "all", // all 表示同步加载和异步加载，async 表示异步加载 ，initial 表示同步加载
          // 此三行的整体意思就是把两种加载方式来自 `node_modules` 目录的文件打包为 vendor.xxx.js
          priority: 5, // 中等
        },
        common: {
          minSize: 0, // 仅测试，由于 shared 文件太小了
          minChunks: 2, // 同时被两个 chunk 所引用
          chunks: "all",
          name: "common",
          priority: 1, // 自动搜索的话，优先级可以放低一些。
        },
        customLib: {
          test: /(customLib\.js)$/,
          minSize: 0, // 仅测试，由于 customLib 文件太小了
          name: "customLib",
          chunks: "initial", // 此包只会同步调用
          priority: 10 // 干预的意愿最强，设高些。
        }

      },
    },
  },
});
