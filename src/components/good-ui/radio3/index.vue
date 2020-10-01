<template>

  <div class="layout inline-block margin-right-10">
      <div class="layout pointer" @click="selected(label)">
        <i class="fa fa-check-square-o color-primary pointer" v-if="value===label"></i>
        <i class="fa fa-square-o pointer color-default" style="color:#dcdfe6" v-else></i>
        <span :class="{'color-primary':value===label}">
          <slot></slot>
        </span>
      </div>
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
          this.$emit('input',item);
        },
      }
    }
</script>