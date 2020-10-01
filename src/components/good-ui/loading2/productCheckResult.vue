<template>
  <div>
  <transition name="bounceA">
    <div class="position-f width-300 height-auto line-height-36 z-index-1000 color-white align-center top-10" style="right:50%; margin-right:-150px;" v-if="array.length!=0">
     <template v-for="item in array">
    
       <template v-if="item.type==='success'">
         <li class="radius-3 background-success margin-bottom-20 align-left padding-left-20" style="background-color: #f0f9eb;
     border-color: #e1f3d8;color: #67c23a;">
         <i class="fa fa-check-circle margin-right-10"></i>{{item.message}}</li>
       </template>
       <template v-if="item.type==='error'">
         <li class="radius-3 background-warning margin-bottom-20 align-left padding-left-20" style="background:#fef0f0; border:1px solid #fde2e2; color:#ec454d"><i class="fa fa-close margin-right-10"></i>{{item.message}}</li>
       </template>
       <template v-if="item.type==='warning'">
         <li class="radius-3 background-warning margin-bottom-20 align-left padding-left-20" style="background:#fef0f0; border:1px solid #fde2e2; color:#ec454d"><i class="fa fa-close margin-right-10"></i>{{item.message}}</li>
       </template>

       
     </template>
       
     </div>

     <div class="position-f width-300 height-auto line-height-36 z-index-1000 color-333 align-center top-10" style="right:50%; margin-right:-150px;" v-if="array2.length!=0">

     <template v-for="item in array2">
    
       <template v-if="item.type==='delete'">
         <li class="radius-3 background-success margin-bottom-20 align-left padding-left-20" style="background-color: #f0f9eb;
     border-color: #e1f3d8;color: #67c23a;">
         <i class="fa fa-check-circle margin-right-10"></i>{{item.message}}</li>
       </template>
     
     </template>
       
     </div>
   </transition>


<!-- <div class="panel-backdrop2" v-if="array2.length!=0"></div> -->
   <transition name="bounceA">
 <!-- v-if="array2[0].type=='loading'" -->

    <div class="position-f width-300 height-auto line-height-36 z-index-1000 color-999 align-center bottom-60" style="right:50%; margin-right:-150px;" v-if="array2.length!=0&&array2[0].type=='loading'">
     <li class="radius-3 margin-bottom-20 align-left padding-left-20 color-primary font-size-36">
         <i class="fa fa-check-circle margin-right-10"></i>
    
         <template>{{message20}}......</template>
         </li>
<!-- <svg id="svg-spinner" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <circle cx="24" cy="4" r="4" fill="#fff"></circle>
  <circle cx="12.19" cy="7.86" r="3.7" fill="#fffbf2"></circle>
  <circle cx="5.02" cy="17.68" r="3.4" fill="#fef7e4"></circle>
  <circle cx="5.02" cy="30.32" r="3.1" fill="#fef3d7"></circle>
  <circle cx="12.19" cy="40.14" r="2.8" fill="#feefc9"></circle>
  <circle cx="24" cy="44" r="2.5" fill="#feebbc"></circle>
  <circle cx="35.81" cy="40.14" r="2.2" fill="#fde7af"></circle>
  <circle cx="42.98" cy="30.32" r="1.9" fill="#fde3a1"></circle>
  <circle cx="42.98" cy="17.68" r="1.6" fill="#fddf94"></circle>
  <circle cx="35.81" cy="7.86" r="1.3" fill="#fcdb86"></circle>
</svg> -->
       
     </div>
   </transition>
    
  

   <template v-if="show">
   <div class="panel-backdrop"></div>
   </template>
   <transition name="bounce">
   <template v-if="show">
   <div class="popover-success" v-if="type==='success'">
     <div class="popover-success-top">
         <div class="popover-success-ico"></div>
         <div class="popover-success-title1">{{list}}</div>
         <div class="popover-success-title2">{{title}}</div>
     </div>
     <div class="popover-success-bottom">
         <div class="button button-sm button-primary" @click="cancel()">关闭</div>
     </div>
   </div>
   
   <div class="popover-danger" v-if="type==='error'">
     <div class="popover-danger-top">
       <div class="popover-danger-ico"></div>
       <div class="popover-danger-title1">操作失败</div>
       <div class="popover-danger-title2">您没有权限删除该项目！</div>
     </div>
     <div class="popover-danger-bottom">
       <div class="button button-sm button-primary" @click="cancel()">关闭</div>
     </div>
   </div>
   
   <div class="popover-info" v-if="type==='info'">
     <div class="popover-info-top">
       <div class="popover-info-ico"></div>
       <div class="popover-info-title1">提示</div>
       <div class="popover-info-title2">{{title}}</div>
     </div>
     <div class="popover-info-bottom">
       <div class="button button-sm button-default" @click="cancel()">关闭</div>
       <div class="button button-sm button-primary" @click="next()">确定</div>
     </div>
   </div>
     </template>
     </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message20:'',
      count:0,
      bool:false,
      show:false,
      messageShow:false,
      type:'',
      dialogFormVisible: false,
      title: "",
      list: [],
      header: [],
      callback:'',
      options:null,
      array:[],
      array2:[],
      messages:{},
      panel:false
    };
  },
  methods: {
    message(options) {
      this.messages=options
      this.array.push(options)
      setTimeout(()=>{
        this.array.shift();
        this.array2.shift();
      },1000)
    },
    loading(value) {
        this.array2=[];
        if(value==='delete'){
          let options={
              type:"delete",
              message:'删除中',
          }
          this.message20='删除中';
          this.array2.push(options)
          return
         // this.message(options)
        }

      let options={
          type:"loading",
          message:'loading',
      }
      this.message20='loading';
      this.array2.push(options)
      /*setTimeout(()=>{
        this.array.shift();
      },2000)*/
      
    },

    loading2() {
      setTimeout(()=>{
        this.array2=[];
      },1000)
     


      
    },
    message2(options) {
      this.type=options.type;
      this.show=options.visible;
      this.title = options.msg;
      this.list = options.data;
      this.dialogFormVisible = true;
      this.callback = options.callback;
      this.options=options
      this.messageShow=false;
    },
    cancel() {
      this.show = false;
    },
    next() {
      this.show = false;
    },
  }
};
</script>
<style scoped>
.bounce-enter-active {
  animation: bounce-in .1s;
}
.bounce-leave-active {
  animation: bounce-in .1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}


.bounceA-enter-active {
  animation: bounceA-in .05s;
}
.bounceA-leave-active {
  animation: bounceA-in .05s reverse;
}
@keyframes bounceA-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>