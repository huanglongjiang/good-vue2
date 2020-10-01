import LoadingComponent from './index.vue'
const goodTextarea = {
  install:function (Vue) {
    Vue.component('goodTextarea',LoadingComponent)
  }
};
// 导出组件
export default goodTextarea