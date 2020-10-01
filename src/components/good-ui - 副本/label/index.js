import LoadingComponent from './index.vue'
const goodLabel = {
  install:function (Vue) {
    Vue.component('goodLabel',LoadingComponent)
  }
};
// 导出组件
export default goodLabel