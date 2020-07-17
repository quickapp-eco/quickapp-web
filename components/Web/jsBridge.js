export default class JsBridge {
  constructor(el, onMessageCb) {
    this.el = el;
    this.onMessageCb = onMessageCb;
  }

  /**
   * 获取webview的可信任的网址
   * @param {string} url webview链接
   */
  static getTrustedUrl(url) {
    if (!url.startsWith("http")) return [];
    const domain = url.split("/") || [];
    const domainName = domain[2] || "";
    if (domainName) return [new RegExp(domainName)];
    return [];
  }

  /**
   * 监听webview消息
   * @param {object} param webview传递过来的信息
   */
  onMessage({ message, url } = {}) {
    const msg = JSON.parse(message);
    if (msg.type === "module") {
      const { name, api } = msg.module;
      const appmodule = $app_require$(`@app-module/${name}`);
      appmodule[api](this.setParamCb(msg.module));
    }
    if (this.onMessageCb) this.onMessageCb(msg, url);
  }

  /**
   * 向webview发送消息
   * @param {Object} message 消息
   */
  postMessage(message) {
    this.el.postMessage(message);
  }

  /**
   * 格式化调用模块的参数
   * @param {object} param 参数
   */
  setParamCb({ params = {}, success, fail }) {
    if (success) {
      params.success = (data) => {
        this.postMessage({
          message: JSON.stringify({
            type: "callback",
            callback: {
              name: success,
              params: data,
            },
          }),
        });
      };
    }
    if (fail) {
      params.fail = (data, code) => {
        this.postMessage({
          message: JSON.stringify({
            type: "callback",
            callback: {
              name: fail,
              params: { data, code },
            },
          }),
        });
      };
    }
    return params;
  }
}
