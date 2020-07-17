# quickapp-web

快应用web增强 (支持加载动画，加载失败提示，失败重新加载和h5页面通信等功能)

## 安装

```
npm install -D @quickapp-eco/quickapp-web
```

## 使用

```
<import name="cweb" src="node_modules/@quickapp-eco/quickapp-web/components/Web"></import>

<template>
  <cweb
    id="web"
    url="https://m.mi.com"
  ></cweb>
</template>
```

**注意点** : 如果觉的 导入组件的路径太长的话，可以新增路径别名。在快应用根目录的 `hap.config.js` 文件中 增加如下配置

```javascript
module.exports = {
  alias: {
    "@qapp-components": path.resolve(__dirname, "node_modules/@quickapp-eco/quickapp-web/components"),
  },
};
```

之后，在导入时就可以这么写了

```
<import name="cweb" src="@qapp-components/Web"></import>
```

### 组件一览

- [web](./docs/web.md) 组件：封装 loading/error 展示以及和 webview 的通信等功能
- [page](./docs/page.md) 组件：封装 loading/error 功能，以及联网自动重试等功能

### 注意点

1. 本组件库采用 designWidth：1080 来进行设计开发的。请将 manifest.json 中的 designWidth 配置设置为 1080。

### 测试

进入 test 目录，在命令行中执行 `hap server --watch` 命令，对 test 目录中的代码进行打包编译生成可用作本地测试的快应用 rpk。

**注意**：由于快应用打包工具的限制，目前只能全局安装 hap 工具并进入在 test 目录中手动执行上述命令


## License

[MIT](./LICENSE)
