import LoadingComponent from './index.vue'
const goodDialog = {
  install:function (Vue) {
    Vue.component('goodDialog',LoadingComponent)
  }
};
// 导出组件
export default goodDialog