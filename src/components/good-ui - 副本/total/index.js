import LoadingComponent from './index.vue'
const goodTotal = {
  install:function (Vue) {
    Vue.component('goodTotal',LoadingComponent)
  }
};
// 导出组件
export default goodTotal