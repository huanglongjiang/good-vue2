import LoadingComponent from './index.vue'
const tdsQueue = {
  install:function (Vue) {
    Vue.component('tdsQueue',LoadingComponent)
  }
};
// 导出组件
export default tdsQueue