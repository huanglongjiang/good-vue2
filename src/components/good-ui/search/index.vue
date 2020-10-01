<template>
   <div class="width-400">
<!--    <el-input placeholder="请输入内容"  v-model="title" class="float-left width-180"> </el-input>
   <el-button class="float-left" icon="el-icon-search" circle @click="dataList(title)"></el-button> -->
         <!--  <input type="text" class="input-default float-left border-right width-180" placeholder="请输入用户名..." v-model="title" style="border: 1px solid #dcdfe6; border-right:0px; height:34px;font-size:12px;">
          <div class="search-button-ico float-left fa fa-search" style="border: 1px solid #dcdfe6; height:34px  " @click="dataList(title)"></div> -->
    </div>
</template>

<script>
    export default {
      inheritAttrs: false,
      data() {
          return {
              title:this.value,
          }
      },
      /*props:{
        value:String,
        disabled:Boolean,
      },*/
      props:['value','disabled'],
      model:{
        prop:'value',
        event:'input',
      },
      watch: {
        value(val) {
          console.log(val)
        this.$nextTick(() => {
            this.title=val;
          });
        }
      },
      methods:{
        dataList(title){
          this.$nextTick(() => {
            this.$emit('input',title)
          });
        }
      }
      
    }
</script>