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

    <div class="position-f width-80 height-80 line-height-80 z-index-1000 color-999 align-center radius-3" style="right:50%; margin-right:-15px; top:50%; background:rgba(40,40,40,0.6)" v-if="array2.length!=0&&array2[0].type=='loading'">
     <li class="radius-3 margin-bottom-20 align-left padding-left-22 color-primary font-size-36" style="color:#fff">
         <i class="el-icon-loading bold margin-right-10" style="font-weight: bold;"></i>
    
         <!-- <template>{{message20}}......</template> -->
         <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
         </li>

       
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

.el-loading-spinner .circular {
    height: 42px;
    width: 42px;
    animation: loading-rotate 2s linear infinite;
}
</style>