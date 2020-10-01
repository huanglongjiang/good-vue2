<template>
     <div>
       <!-- <input type="text" class="input-default input-h34 width-max" v-model="title" :disabled="disabled" v-on:input="a(title,$event)"> -->
       <input type="text" class="input-default input-h34 width-max radius-3 padding-left-10 padding-right-10" v-model="title" :disabled="disabled" v-on:input="a(title,$event)" style="border: 1px solid #dcdfe6; height:30px">
    
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
          console.log(val)
        this.$nextTick(() => {
            this.title=val;
          });
        }
      },
      methods:{
        a(title,event){
          console.log(event.target.value)
          this.$nextTick(() => {
            this.$emit('input',title)
          });
        }
      }
      
    }
</script>