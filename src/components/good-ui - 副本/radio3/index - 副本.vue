<template>
     <div class="layout" @click="checked(label)">66
        <i class="fa fa-check-square-o color-primary pointer" v-if="select.includes(label)"></i>
        <i class="fa fa-square-o pointer color-default" style="color:#dcdfe6" v-else></i>
  
       

        <slot></slot>
     </div>
</template>

<script>
    export default {
      props: ["select","label"],
        data() {
            return {
               text:[],
            }
      },
      watch: {
        val(){
            this.check=this.val;
        },
      },
      methods:{
        checked(item){
          this.text.push(item)
          console.log(item)
          console.log(this.text)
          this.$emit('update:select',this.text);
          
          /*if(item){
            console.log(this.select)
            this.$emit('update:select', item);
          }else{
            console.log(item)
            this.$emit('update:select', '');
          }*/
        }
      }
    }
</script>
<style scoped>
</style>