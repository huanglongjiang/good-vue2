<template>
  <div class="layout inline-block margin-right-10">
      <div class="layout pointer" v-if="disabled==undefined" @click="selected(label)">

        <span class="radio width-14 height-14 background-white position-r top-2 inline-block radius-50 border-1 border-default is-checked" v-if="value===label"></span>

        <span class="radio width-14 height-14 background-white position-r top-2 inline-block radius-50 border-1 border-default" v-else></span>
        <span class="font-size-14" :class="{'color-dodgerblue2':value!==label,'color-dodgerblue':value===label}">
          <slot></slot>
        </span>
      </div>

      <div class="layout no-drop" v-else>

        <span class="radio2 width-14 height-14 background-eee position-r top-2 inline-block radius-50 border-1 border-ccc is-checked2" style="background:#f6f6f6; border-color:#ccc" v-if="value===label"></span>
        <span class="radio2 width-14 height-14 background-eee position-r top-2 inline-block radius-50 border-1 border-default" style="background:#eee" v-else></span>
        <span class="color-ccc font-size-14" style="color: #c0c4cc;">
          <slot></slot>
        </span>
      </div>
  </div>
     
</template>
<!-- 
使用说明:
<good-radio v-model="value" label="0" disabled>名称</good-radio>
value：值
label：下标
disabled：禁用(禁用时需加上disabled) 
-->
<script>
    export default {
      props:['value','label','disabled'],
      model:{
        prop:'value',
        event:'input',
      },
      methods:{
        selected(item){
          this.$emit('input',item);
        },
      }
    }
</script>
<style type="text/css" scoped>
  .color-dodgerblue{color: dodgerblue}
  .color-dodgerblue2{color: #606266;}
  .is-checked{
    border-color: #409eff;
    background: #409eff;
  }
  .radio:after{width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
     transform: translate(-50%,-50%) scale(0); 
    transition: transform .15s ease-in;}
  .is-checked:after {
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: #fff;
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%) scale(1);
  }

  .is-checked2{
    border-color: #eee;
    background: #f6f6f6;
  }
  .radio2:after{width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
     transform: translate(-50%,-50%) scale(0); 
    transition: transform .15s ease-in;}
  .is-checked2:after {
      width: 64x;
      height: 64x;
      border-radius: 100%;
      background-color: #ddd;
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%) scale(1);
  }
</style>