import LoadingComponent from './index.vue'
const goodKey = {
  install:function (Vue) {
    Vue.component('goodKey',LoadingComponent)
  }
};
// 导出组件
export default goodKey