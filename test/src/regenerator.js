const injectRef = Object.getPrototypeOf(global) || global;

// 注入regeneratorRuntime
// eslint-disable-next-line import/no-extraneous-dependencies
injectRef.regeneratorRuntime = require("@babel/runtime/regenerator");
