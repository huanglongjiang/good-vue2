import LoadingComponent from './index.vue'
const goodButton = {
  install:function (Vue) {
    Vue.component('goodButton',LoadingComponent)
  }
};
// 导出组件
export default goodButton