import productCheckResult from './productCheckResult.vue'
const Loading = {
  install: function (Vue) {
    const productCheckResultInstance = Vue.extend(productCheckResult)
    let productCheckResultInit;
    const initInstance = () => {
      // 实例化vue实例
      productCheckResultInit = new productCheckResultInstance();
      let productCheckResultEl = productCheckResultInit.$mount().$el;
      document.body.appendChild(productCheckResultEl);
    };
    Vue.prototype.$model = {
      message(options,callback) {
        if (!productCheckResultInit) {
          initInstance();
        }
        productCheckResultInit.message2(options)
        let a=productCheckResultInit.next()

        console.log(callback())
        return callback
      }
    }
  }
}

// 导出组件
export default Loading