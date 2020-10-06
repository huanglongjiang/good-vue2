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

const google=[
  "t-20008",
];
function request(config) {
  if(!google.includes(config.data.google)){

    for (let key of values(initData)) {
      
      if(config.data.operating===key){
        Vue.prototype.$hlj.loading(config.data.operating);
      }
    }
  }
  
}

export default request