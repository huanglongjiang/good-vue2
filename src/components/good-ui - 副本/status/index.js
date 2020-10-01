import LoadingComponent from './index.vue'
const goodStatus = {
  install:function (Vue) {
    Vue.component('goodStatus',LoadingComponent)
  }
};
// 导出组件
export default goodStatus