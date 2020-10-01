<template>

  <div class="layout">
      <!-- 全选样式 -->
      <template v-if="typeof(value)==='boolean'">
      <div class="layout pointer" @click="selected2(value)">
        <i class="fa fa-check-circle color-primary pointer width-18 font-size-18" v-if="value"></i>
        <i class="fa fa-check-circle pointer color-default width-18 font-size-18" style="color:#dcdfe6" v-else></i>
        <slot></slot>
      </div>
      </template>
      <!-- 全选样式 -->

      <!-- 默认样式 -->
      <template v-if="typeof(value)==='undefined'">
      <div class="layout">
        <i class="fa fa-check-circle color-primary pointer width-18 font-size-18"></i>
        <slot></slot>
      </div>
      </template>
      <!-- 默认样式 -->

      <!-- 列表单选样式 -->
      <template v-if="typeof(value)==='object'">
      <div class="layout pointer" @click="selected(label)">
        <i class="fa fa-check-circle color-primary pointer width-18 font-size-18" v-if="value.includes(label)"></i>
        <i class="fa fa-check-circle pointer color-default width-18 font-size-18" style="color:#dcdfe6" v-else></i>
        <span class="font-size-12" :class="{'color-primary':value.includes(label),'color-ccc':!value.includes(label)}">
          <slot></slot>
        </span>
      </div>
      </template>
      <!-- 列表单选样式 -->
  </div>
     
</template>

<script>
    export default {
      props:['value','label'],
      model:{
        prop:'value',
        event:'input',
      },
      methods:{
        selected(item){
          if(this.value.includes(item)){
            this.value.map((item2,index,array)=>{
              if(item===item2){
                  array.splice(index,1);
              }
            })
          }else{
            this.value.push(item)
          }
          this.$emit('update:select',this.value);
        },
        selected2(item){
          this.$emit('input',!item);
        }
      }
    }
</script>
<style scoped>
</style>