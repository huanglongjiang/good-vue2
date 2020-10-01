import LoadingComponent from './index.vue'
const goodWord = {
  install:function (Vue) {
    Vue.component('goodWord',LoadingComponent)
  }
};
// 导出组件
export default goodWord