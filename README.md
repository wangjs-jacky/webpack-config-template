# webpack-config-template

## 0.前言

此文档为梳理自己的 `Webpack` 最佳实践配置。

后续会陆续补充 `README` 文档说明，目前还处于 `1.0` 配置环境，最新版配置请详见幕布在线笔记：https://mubucm.com/doc/Gu4KeSRkFA



## 1. webpack 已完成配置

- `webpack` 配置最佳实践

  - 1. 创建四个配置文件：

       - `webpack.base.js`：开发环境和生产环境中同时被使用到的配置
       - ``webpack.dev.js`：开发环境
       - `webpack.prod.js`：生产环境
       - `webpack.profile.js` ： 性能监控相关

    2. 如何解决环境传输问题：

       - 使用 `cross-env` 设置环境变量参数，`npm` 配置如下：

         ```json
         "scripts": {
           "test": "webpack --config webpack.base.js --color --progress",
           "serve": "webpack serve --config webpack.dev.js --color --progress",
           "build": "cross-env NODE_ENV=production webpack --config webpack.prod.js --json >stats.json",
           "profile": "cross-env NODE_ENV=production webpack --config webpack.profile.js  --profile "
         },
         ```

       - 补充方案：使用 `DefinePlugin` 插件（不推荐）

         ```javascript
         // 注意写法，字符串内的内容会被视为变量，因此需要转成字符串。
         new webpack.DefinePlugin({
           "process.env.NODE_ENV": '"production"',
           "process.env.NODE_ENV": JSON.stringfiy("production")
         })
         ```

    3. 使用`webpack-merge` 插件合并各项配置。

- `webpack` 配置方案：

  1. 如何解析 `ES6` 语法降级以及 `polyfill` 垫片（复杂）

     - 如何配置？

       - 本项目方案，将 `babel` 有关的配置写在 `babel.config.json` 或者 `.babelrc` 文件中，将目标环境配置 `target` 写在 `.browserslistrc` 文件。

       - 处理逻辑如下：

         - `babel-loader` $\rightarrow$  读取 `babel.config.json` 文件 $\rightarrow$ 进行预设规则转换（`react|typescrit|preset-env`）$\rightarrow$ 读取 `tsconfig.json` 文件等配置文件。

         - 使用 `browserslistrc` 文件的原因，不只是 `babel` 有目标宿主环境的配置要求，此文件可被其余的工具库所读取。（也可直接配置在 `package.json` 中）

     - 如何配置 `polyfill` 垫片功能？

       - 1. 会被全局污染（最佳实践：`core-js:3`+按需导入）

            在`babel` 中 `polyfill` 的实践非常复杂，这边就不对各种配置方案进行详细阐述，只给出最佳实践。

            - 安装 `core-js@3` 版本（如果安装了`@babel/polyfill` 默认自带了`core-js@2`版本）。

            - 配置按需导入：

              ```json
              presets: [
                ["@babel/preset-env", {
                  useBuiltIns: "usage",
                  corejs: 3,
                }]
              ]
              ```

         2. 不被全局污染。

            正常业务开发中不考虑此情况，只有发布开发库时才会考虑`polyfill` 是否会污染全局环境的问题 ，此时将`@babel/polyfill` 方案替换为`@babel/runtime`（需手动导入，不推荐） 或 `@babel/plugin-transform-runtime`。

         

         

     

