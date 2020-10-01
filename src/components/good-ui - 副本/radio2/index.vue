<template>

  <div class="layout">
      <!-- 全选样式 -->
      <template v-if="typeof(select)==='boolean'">
      <div class="layout pointer" @click="selected2(select)">
        <i class="fa fa-check-circle color-primary pointer width-18 font-size-18" v-if="select"></i>
        <i class="fa fa-check-circle pointer color-default width-18 font-size-18" style="color:#dcdfe6" v-else></i>
        <slot></slot>
      </div>
      </template>
      <!-- 全选样式 -->

      <!-- 默认样式 -->
      <template v-if="typeof(select)==='undefined'">
      <div class="layout">
        <i class="fa fa-check-circle color-primary pointer width-18 font-size-18"></i>
        <slot></slot>
      </div>
      </template>
      <!-- 默认样式 -->

      <!-- 列表单选样式 -->
      <template v-if="typeof(select)==='object'">
      <div class="layout pointer" @click="selected(label)">
        <i class="fa fa-check-circle color-primary pointer width-18 font-size-18" v-if="select.includes(label)"></i>
        <i class="fa fa-check-circle pointer color-default width-18 font-size-18" style="color:#dcdfe6" v-else></i>
        <span class="font-size-12" :class="{'color-primary':select.includes(label),'color-ccc':!select.includes(label)}">
          <slot></slot>
        </span>
      </div>
      </template>
      <!-- 列表单选样式 -->
  </div>
     
</template>

<script>
    export default {
      props: ["select","label"],
      watch: {
        val(){
            this.check=this.val;
        },
      },
      methods:{
        selected(item){
          if(this.select.includes(item)){
            this.select.map((item2,index,array)=>{
              if(item===item2){
                  array.splice(index,1);
              }
            })
          }else{
            this.select.push(item)
          }
          this.$emit('update:select',this.select);
        },
        selected2(item){
          this.$emit('update:select',!item);
        }
      }
    }
</script>
<style scoped>
</style>