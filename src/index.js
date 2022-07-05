// import "@babel/polyfill"

import { a } from "@/mockModule/a"; // 直接引入
const b = import("@/mockModule/b"); // 动态引入，也按需加载（会多成成一个 chunk ）
import { X } from "@/JSXComponent/index.jsx"; //支持 jsx 导入
import { x } from "@/ts/index.ts"; // 支持 ts 导入
import { shared } from "./shared"; // 同时被 index 和 admin 导入
//  css 样式导入
import "@/scss/scss-demo.scss";
import "@/less/less-demo.less";
import "@/stylus/stylus-demo.styl";

// 第三方包
import { xxx } from "./customLib.js";
console.log(xxx);

// 导入 React 测试 vendor.xxx.js
import React from "react";

// 测试代码： 避免tree-shaking
console.log(React);
console.log(shared);
console.log(X);
console.log(x); 

const hi = () => {
  console.log("王家盛");
  console.log("a", a);
  console.log("b", b);
  console.log(Promise.resolve("test promise")); // Promise 需要 polyfill
};

hi();
