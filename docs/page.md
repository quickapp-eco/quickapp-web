# page 组件

支持加载动画，加载失败提示，失败重新加载等能力

## 依赖接口

* `system.network` 

## 使用例子

``` 
<import name="cweb" src="@qapp-components/Web"></import>

<template>
  <page id="page" @retry="retry" is-error="{{isError}}" is-loading="{{isLoading}}">
    <text slot="loading">加载中...</text>
    <text slot="error" @click="retry">加载失败！请刷新</text>
    <div slot="content" class="content">
      <text>page 测试</text>
    </div>
  </page>
</template>
<script>
export default {
  private: {
    isError: false,
    isLoading: true
  },
  onReady() {
    this.success();
  },
  retry() {
    this.loading();
    setTimeout(() => {
      this.success();
    }, 1000);
  },
  loading() {
    this.isLoading = true;
    this.isError = false;
  },
  success() {
    this.isLoading = false;
    this.isError = false;
  },
  error() {
    this.isLoading = false;
    this.isError = true;
  }
};
</script>
```

## 属性

| 名称        | 类型                                                  | 必填 | 默认值                                                                                  | 描述                                                                              |
| ----------- | ----------------------------------------------------- | ---- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| isError | Boolean     | `Y` |       | 错误标示   |
| isLoading | Boolean     | `Y` |       | 加载标示   |
| loadinginfo | `{txt:string, icon:'string'}` | `N` | `{txt:'加载中...',icon:'defalut-icon-path'` | 加载动画信息                                                                      |
| errorinfo   | `{neterror:string, dataerror:string,btnstyle:Object}` | `N` | `{neterror:'Sorry～网络貌似开小差了哦～',dataerror:'加载失败，请点击重试',btnstyle:{}}` | 错误信息文案（neterror：无网络，dataerror：数据加载失败, btnstyle: 刷新按钮样式） |

## slot

| 名称    | 描述                                        |
| ------- | ------------------------------------------- |
| loading | 加载 slot；不设置则使用默认 ui              |
| error   | 加载失败/网络错误 slot；不设置则使用默认 ui |
| content | 具体页面内容 slot                           |

**注意**： 当使用自己的 `slot` 时，可不用传入相关属性

## 事件

| 事件名 | 参数 | 描述                   |
| ------ | ---- | ---------------------- |
| retry  | -    | 当加载失败时，重新加载 |

