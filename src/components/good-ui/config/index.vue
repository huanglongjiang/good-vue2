<template>
<div>

<div class="panel-backdrop2" style="background:rgba(0,0,0,0.2);z-index:110" v-if="showBool" @click="close"></div>
<div class="div" :class="{'animation10':showBool,'animation20':showBool2}">
<div class="font-size-24 color-white align-center line-height-48 position-a top-250 background-primary" style=" width:48px; height:48px; display:block; left:-48px;border;border-top-left-radius: 5px;border-bottom-left-radius: 5px;">
  <span class="block width-max height-max line-height-48 el-icon-close pointer" style="line-height:48px;" v-if="showBool" @click="close"></span>
  <span class="block width-max height-max line-height-48 el-icon-setting pointer" style="line-height:48px;" v-else @click="open"></span>
</div>
<div>
<span class="align-center bold height-36 line-height-36 margin-bottom-10 block color-white background-primary">角色类型选择</span>
  <ul class="align-left padding-20">
    <template v-for="(item,index) in data.roleList">
    <li class="block padding-5 font-size-14 background-primary color-white" v-if="data.roleId===item.id">
      {{index+1}}、{{item.title}}
    </li>
    <li class="block padding-5 font-size-14 pointer" v-else @click="Submit(item,data)">
      {{index+1}}、{{item.title}}
    </li>
    </template>
  </ul>
</div>
</div>

</div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["data"],
      data() {
          return {
              showBool:false,
              showBool2:false,
              value1:20,
              form:{
                id:'',
                roleId:'',
              }
          }
      },
      computed: {
            ...mapState(['state']),
      },
      methods:{
        //数据状态
        open(){
          this.showBool=true;
          this.showBool2=false;
        },
        close(){
          this.showBool=false;
          this.showBool2=true;
        },
        Submit(item,obj){
          this.form={
            userId:obj.id,
            roleId:item.id,
          }
            let data={
                "google":"t-100142",
                "operating":"configRole",
                "form":this.form,
            }
            this.$axios.post(global.APIPATH,data).then(res => {  
              if(res.data.retType=='success'){
                this.data.roleId=item.id
                this.$emit('updata:data',data)
               
              }
            });
        },
      }
    }
</script>


<style>
.div {
 position: fixed; right:-270px; width:270px; height:auto;
background: #fff;
top: 0px;
bottom: 0px;
/*box-shadow: -3px 0px 3px #ccc;*/
z-index: 121;
}



.animation10 {
  display: block;
-webkit-animation:bounceInRight2 0.1s ease both;
-moz-animation:bounceInRight2 0.1s ease both;
}
@-webkit-keyframes bounceInRight2 {
  0% {
    right:-270px;
    display: block;
  }
 
  100% {
  right:0px;
  }
}



.animation20{
-webkit-animation:bounceInLeft2 0.1s  ease both;
-moz-animation:bounceInLeft2 0.1s  ease both;

}
@-webkit-keyframes bounceInLeft2{
0%{
  right:0px;
}
100%{
  right:-270px;
  display: none;
}
}


</style>