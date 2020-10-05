import Vue from 'vue'
import App from './App'
import Vuex from 'vuex';
import store from './vuex/store';
import router from './router'
import axios from 'axios';
import VueResource from 'vue-resource';  
import ElementUI from 'element-ui';
import Ehartist from 'vue-chartist';
/*import Editor from 'editor';*/
/*import Jquery from 'jquery';*/
import moment from 'moment';
import path from './vuex/global'
import Good from './components/index.js'
import constant from './vuex/const'
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
Vue.use(Good)
Vue.use(ElementUI);
Vue.use(Ehartist);
// Vue.use(Jquery);

Vue.prototype.$axios = axios;
Vue.prototype.constant = constant;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})


Vue.filter('moment', function (value, formatString) {

    if(value!=false){
      formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
      return moment(value).format(formatString)
    }

     
 })

var num=0;
axios.interceptors.request.use(

config => {

    // Vue.prototype.$hlj.loading();
    num++
    //Good.constant2(config)
    if (localStorage.getItem("token")) {  // 判断是否存在X-Authorization，如果存在的话，则每个http header都加上token
        config.headers["token"] ="token"+localStorage.getItem("token");
    };
    return config;
})


axios.interceptors.response.use(
 res => {
  // console.log(num)
   num--
   	if(res.data.retType==='failed') {
      let options={
          type:"success",
          message:res.data.retMsg,
      }
      //Vue.prototype.$hlj.message(options)
      window.location.href='#/login';
      return
    }

    if(res.data.retType==='success'||res.data.retType==='error'||res.data.retType==='warning') {
     let options={
          type:res.data.retType,
          message:res.data.message,
      }
      Vue.prototype.$message(options);
      
      if(res.data.retType==='error'||res.data.retType==='warning') {

        return
      }
    }
   
    // console.log(num)
    if(num===0){
      //Vue.prototype.$hlj.loading2()
    }

    return res;
},
error => {
  let options={
          type:"warning",
          message:'接口请求异常！',
      }
      //Vue.prototype.$hlj.message(options)
      //return error;
      return Promise.reject('接口请求异常！')
      //return Promise.reject(new Error('接口请求异常！'))
})
