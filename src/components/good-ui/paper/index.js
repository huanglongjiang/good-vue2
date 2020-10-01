import LoadingComponent from './index.vue'
const goodPaper = {
  install:function (Vue) {
    Vue.component('goodPaper',LoadingComponent)
  }
};
// 导出组件
export default goodPaper