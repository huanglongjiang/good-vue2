import LoadingComponent from './index.vue'
const goodTime = {
  install:function (Vue) {
    Vue.component('goodTime',LoadingComponent)
  }
};
// 导出组件
export default goodTime