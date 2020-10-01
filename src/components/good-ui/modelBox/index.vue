<template>
<div>
  <template v-if="counter>0">
    <div class="panel-backdrop2" v-if="visible" @click="close"></div>
  </template>
  <template v-else>
    <div class="panel-backdrop" v-if="visible" @click="close"></div>
  </template>
  
  <transition name="bouncea">
    <div id="model1" class="popover-modal popover-animate layout" style="right:0px;" v-if="visible">
        <div class="popover-modal-header">
          <div class="title">{{title}}</div>
          <div class="close" @click="close"></div>
        </div>
        <div class="popover-modal-body">
          <slot name="body"></slot>
        </div>      
        <div class="popover-modal-footer position-a slotGood" style="bottom: 0px; right: 0px; text-align: right;">
            <slot name="footer"></slot>
        </div>
        
    </div>
    
  </transition>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      counter:0,
    }
  },
  computed: {
            ...mapState(['state']),
  },
  props:['visible','title','modelType'],
  watch: {
      visible(val) {
          this.counter=this.constant.counter;
          if(val){
            this.constant.counter++;
          }else{
           this.constant.counter--;
          }
          if(this.constant.counter>0){
            document.getElementsByTagName("body")[0].className="hidden";
          }else{
            document.body.removeAttribute("class","hidden");
          }
      }
  },
  methods: {
    close(){
      this.$emit('update:visible', false);
    },
  }
}
</script>
<style>
.hidden{overflow: hidden;}
.bouncea-enter-active {
  animation: bouncea-in .2s;
}
.bouncea-leave-active {
  animation: bouncea-in .2s reverse;
}
@keyframes bouncea-in {
  0% {
    right:-1000px;
  }
  100% {
    right:0px;
  }
}
</style>