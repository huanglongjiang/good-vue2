<template>
     <div>
      <textarea maxlength="200" class="input-default height-120 line-height-20 width-max padding-10 background-white" v-model="title" v-on:input="a(title,$event)" style="border: 1px solid #dcdfe6; ">
      </textarea>
    
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