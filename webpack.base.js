const path = require("path");
//清理dist文件夹的插件，用来在每次执行构建的时候清空上次构建的结果防止文件缓存
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NODE_ENV = process.env.NODE_ENV; // 通过 cross-env 切换版本

const cssLoaders = (...loaders) => [
  NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
  "css-loader",
  ...loaders,
];

module.exports = {
  entry: {
    index: "./src/index.js", // 这里 index 是当前 chunk 的id（后续可能用到）
    admin: "./src/admin.js", // 这里 admin 是当前 chunk 的id
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js", // 打包同步代码（chunk-level）
    chunkFilename: "[name].[chunkhash:5].js", // 打包异步代码
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  module: {
    rules: [
      {
        //配置babel-loader用来编译和解析js
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // 后续都可在 babel.config.json 中配置
        },
      },
      {
        test: /\.less$/i,
        use: cssLoaders({
          loader: "less-loader",
          options: {
            // less 变量文件自动引入功能：
            // additionalData: `
            //     @import "~@/less/less-vars.less"; // 自动导入 less 变量
            //   `,
          },
        }),
      },
      {
        test: /\.styl(us)?/i,
        use: cssLoaders({
          loader: "stylus-loader",
          options: {
            stylusOptions: {
              import: [
                path.resolve(__dirname, "./src/stylus/stylus-vars.styl"), // 自动导入 styls 变量
              ],
            },
          },
        }),
      },
      {
        test: /\.s[ac]ss/i,
        exclude: /node_modules/,
        use: cssLoaders({
          loader: "sass-loader",
          options: {
            additionalData: `
                @import "~@/scss/scss-vars.scss"; // 自动在头部导入 scss 变量
              `,
            sassOptions: {
              includePaths: [__dirname],
            },
          },
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html", // file-level(html 命名建议使用 index.html)
      chunks: ["index"], // 这里填写 entry 中 chunk 的 id
    }),
    new HtmlWebpackPlugin({
      template: "./public/admin.html",
      filename: "admin.html", // 这里是一个 BUG，不推荐使用 magic string [name].html 会被提示重名的问题
      chunks: ["admin"], // 这里填写 entry 中 chunk 的 id
    }),
    //清理dist文件夹的插件，用来在每次执行构建的时候清空上次构建的结果防止文件缓存
    new CleanWebpackPlugin({
      path: "./dist",
    }),
    NODE_ENV === "production" &&
      new MiniCssExtractPlugin({
        filename: "[name]_[contenthash:5].css",
      }),
  ].filter(Boolean), // filter Boolean 的作用，过滤返回结果为 false 的情况
  devtool: NODE_ENV === "production" ? undefined : "source-map", // 是否需要sourcemap
};
