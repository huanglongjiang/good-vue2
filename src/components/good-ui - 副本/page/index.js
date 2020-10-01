import LoadingComponent from './index.vue'
const goodPage = {
  install:function (Vue) {
    Vue.component('goodPage',LoadingComponent)
  }
};
// 导出组件
export default goodPage