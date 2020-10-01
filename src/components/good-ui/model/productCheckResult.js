import modal from './productCheckResult.vue'
const Loading = {
  install: function (Vue) {
    const productCheckResultInstance = Vue.extend(modal)
    let productCheckResultInit;
    const initInstance = () => {
      // 实例化vue实例
      productCheckResultInit = new productCheckResultInstance();
      let productCheckResultEl = productCheckResultInit.$mount().$el;
      document.body.appendChild(productCheckResultEl);
    };
    Vue.prototype.$hlj = {
      message(options,b) {
        if (!productCheckResultInit) {
          initInstance();
        }
        productCheckResultInit.message2(options)
        return new Promise((resolve, reject) => {
          resolve();
        });
      },
      confirm(options) {
        if (!productCheckResultInit) {
          initInstance();
        }
        productCheckResultInit.message2(options)
        return new Promise((resolve, reject) => {
          productCheckResultInit.next=function(){
            productCheckResultInit.show = false;
            resolve()
          };
          productCheckResultInit.cancel=function(){
            productCheckResultInit.show = false;
            reject()
          };
        });
        
      }
      
    }

  }
}

// 导出组件
export default Loading