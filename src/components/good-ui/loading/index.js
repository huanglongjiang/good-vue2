import LoadingComponent from './Loading.vue'
const Loading = {
  install:function (Vue) {
    Vue.component('Loading',LoadingComponent)
  }
};
// 导出组件
export default Loading