import LoadingComponent from './index.vue'
const goodMenu = {
  install:function (Vue) {
    Vue.component('goodMenu',LoadingComponent)
  }
};
// 导出组件
export default goodMenu