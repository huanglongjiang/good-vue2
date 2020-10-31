import LoadingComponent from './index.vue'
const goodConfig = {
  install:function (Vue) {
    Vue.component('goodConfig',LoadingComponent)
  }
};
// 导出组件
export default goodConfig