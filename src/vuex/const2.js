import Vue from 'vue'
import Vuex from 'vuex'
import Path from 'path'
import axios from 'axios';
Vue.use(Vuex)
let {keys, values, entries} = Object;
const initData=[
  //"status",
  "lists",
  "delete",
  //"select",
];
function request(config) {

  for (let key of values(initData)) {
    
    if(config.data.operating===key){
      console.log(`===${key}`)
      Vue.prototype.$hlj.loading(config.data.operating);
    }
  }
  
}

export default request