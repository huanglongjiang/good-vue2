import LoadingComponent from './index.vue'
const goodInfo = {
  install:function (Vue) {
    Vue.component('goodInfo',LoadingComponent)
  }
};
// 导出组件
export default goodInfo