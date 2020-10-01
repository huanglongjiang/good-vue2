import LoadingComponent from './index.vue'
const goodLogo = {
  install:function (Vue) {
    Vue.component('goodLogo',LoadingComponent)
  }
};
// 导出组件
export default goodLogo