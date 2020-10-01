import LoadingComponent from './index.vue'
const goodSearch = {
  install:function (Vue) {
    Vue.component('goodSearch',LoadingComponent)
  }
};
// 导出组件
export default goodSearch