import LoadingComponent from './index.vue'
const goodBox = {
  install:function (Vue) {
    Vue.component('goodBox',LoadingComponent)
  }
};
// 导出组件
export default goodBox