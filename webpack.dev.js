//引入webpack-merge用来合并配置到webpack.base.js中
const { merge } = require("webpack-merge");
//引入webpack.base.js
const base = require("./webpack.base.js");
const path = require("path");

module.exports = merge(base, {
  //定义环境为开发环境
  mode: "development",
  //配置本地服务
  devServer: {
    //配置本地的静态资源文件夹，用来让这两个文件夹内部的文件可以通过访问http地址直接展示
    static: [
      path.resolve(__dirname, "src"), //这里是构建目标路径
      // path.resolve(__dirname, "public"), //这里是public部分的内容
    ],
    historyApiFallback: true, // 将任意 404 响应替换为 index.html ，当需要使用 Histroy API 时必须打开。
    host: "localhost", //本地服务启动后的ip地址
    port: 3005, //本地服务启动的端口号
    open: true, //启动时自动打开默认浏览器,
    proxy: {
      //设置代理服务器
      // '/api': {
      //   target: 'https://other-server.example.com',
      //   secure: false,
      // },
    },
    devMiddleware: {
      // writeToDisk: true, // https://www.jianshu.com/p/435ad3e20e6c
    },
  },
  module: {
    rules: [],
  },
});
