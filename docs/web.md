# web 组件

支持加载动画，加载失败提示，失败重新加载，和 h5 页面通信等功能

## 依赖接口

- `system.network`

## 使用例子

```
<import name="cweb" src="@qapp-components/Web"></import>

<template>
  <cweb id="web" url="{{webSrc}}">
    <text slot="loading" class="loading-txt font-regular">加载中...</text>
    <text slot="error" class="error-button font-regular" @click="retry">加载失败！请刷新</text>
  </cweb>
</template>

<script>
  data: {
    webSrc: "https://www.baidu.com"
  },
  retry() {
    const webVm = this.$child("web");
    webVm.retry();
  },
  onBackPress() {
    const webVm = this.$child("web");
    if (!webVm || webVm.isError) return false;

    webVm.canBack({
      callback: e => {
        if (e) {
          webEl.back();
        } else {
          router.back();
        }
      }
    });
    return true;
  }
</script>
```

## 注意点

- 快应用最小版本 1050+

## 属性

| 名称        | 类型                                                  | 必填 | 默认值                                                                                  | 描述                                                                              |
| ----------- | ----------------------------------------------------- | ---- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| url         | `String`                                              | `Y`  | `-`                                                                                     | H5 链接地址                                                                       |
| loadinginfo | `{txt:string, icon:'string'}`                         | `N`  | `{txt:'加载中...',icon:'defalut-icon-path'`                                             | 加载动画信息                                                                      |
| errorinfo   | `{neterror:string, dataerror:string,btnstyle:Object}` | `N`  | `{neterror:'Sorry～网络貌似开小差了哦～',dataerror:'加载失败，请点击重试',btnstyle:{}}` | 错误信息文案（neterror：无网络，dataerror：数据加载失败, btnstyle: 刷新按钮样式） |

## slot

| 名称    | 描述                                        |
| ------- | ------------------------------------------- |
| loading | 加载 slot；不设置则使用默认 ui              |
| error   | 加载失败/网络错误 slot；不设置则使用默认 ui |

**注意**： 当使用自己的 `slot` 时，可不用传入相关属性

## 事件

事件跟原生快应用 web 组件的事件一致，不过由于包裹了一层事件，内部使用 `this.$emit` 方式触发，导致外部参数获取时需要从 `e.detail` 上

| 事件名       | 参数                                                                      | 描述                       |
| ------------ | ------------------------------------------------------------------------- | -------------------------- |
| pagestart    | `e.detail：{url: urlString}`                                              | 开始加载网页时触发         |
| pagefinish   | `e.detail：{url: urlString, canBack: true/false, canForward: true/false}` | 网页加载完成时触发         |
| error        | `e.detail：{errorMsg: errorMsg}`                                          | 网页加载出现错误时触发     |
| message      | `e.detail：{message: messageString, url: urlString}`                      | 监听 h5 页面发送过来的消息 |
| titlereceive | `e.detail：{title: title}`                                                | 收到网页标题时触发         |

## 方法

| 名称        | 参数                     | 描述                       |
| ----------- | ------------------------ | -------------------------- |
| retry       |                          | 加载失败时，重新加载方法   |
| forward     |                          | 浏览历史页面中的前一个页面 |
| back        |                          | 浏览历史页面中的后一个页面 |
| canForward  | {callback: Function}     | 是否可以向前浏览           |
| canBack     | {callback: Function}     | 是否可以向后浏览           |
| postMessage | {message: messageString} | 向网页发送消息             |

### message 事件传递消息格式说明

当 h5 发送的消息格式如下时，web 组件内可以自动响应，并调用对应接口模块的相应 api

```
const msg = {
  type: "module",
  module: {
    name: 'system.network',
    api: "getType",
    params: {
      ....
    },
    success: 'methodname', // 全局方法名
    fail: "methodname" // 全局方法名
  }
}
system.postMessage(JSON.stringify(msg))

```
