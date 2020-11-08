<template>
     <div>
        <template v-if="disabled==undefinde">
          
       <!-- <input type="text" class="input-default input-h34 width-max" v-model="title" :disabled="disabled" v-on:input="a(title,$event)"> -->
       <input type="text" class="input-default input-h34 width-max padding-left-10 padding-right-10" v-model="title" :disabled="disabled" v-on:input="a(title,$event)">
        </template>
        <template v-else>
       <input type="text" class="input-default input-h34 width-max padding-left-10 padding-right-10 is-disabled" v-model="title" :disabled="disabled" v-on:input="a(title,$event)">
          
        </template>
    
     </div>
</template>

<script>
    export default {
      name: 'goodInput',

      componentName: 'goodInput',
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
        this.$nextTick(() => {
            this.title=val;
          });
        }
      },
      methods:{
        a(title,event){
          this.$nextTick(() => {
            this.$emit('input',title)
          });
        }
      }
      
    }
</script>
<style type="text/css" scoped>
  .is-disabled{background-color: #f5f7fa;border-color: #e4e7ed;color: #c0c4cc;box-shadow: initial;border: 1px solid #DCDFE6;}
  .input-default:not(.is-disabled){transition-duration: .3s;border: 1px solid #DCDFE6;box-shadow: initial;}
  .input-default:not(.is-disabled):hover{border: 1px solid dodgerblue;transition-duration: .3s;}
  .input-default:not(.is-disabled):focus{border: 1px solid dodgerblue;box-shadow: rgba(30,144,255,0.7) 0px 0px 0px 0.125rem;} /*1px*/
  /*.input-default:hover{border: 1px solid #4fc08d;transition-duration: .3s;}
  .input-default:focus{border: 1px solid #4fc08d;box-shadow: rgba(79,192,141,0.7) 0px 0px 0px 1px;}*/
</style>