import LoadingComponent from './index.vue'
const goodTag = {
  install:function (Vue) {
    Vue.component('goodTag',LoadingComponent)
  }
};
// 导出组件
export default goodTag