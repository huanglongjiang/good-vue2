import LoadingComponent from './index.vue'
const goodInput = {
  install:function (Vue) {
    Vue.component('goodInput',LoadingComponent)
  }
};
// 导出组件
export default goodInput