<template>
     <div class="layout">
        <template v-for="(item,index) in list">
            <label class="margin-right-10 pointer" :for="radioId+index">
                <i class="fa fa-dot-circle-o color-primary" v-if="index==check"></i>
                <i class="fa fa-circle-o color-ccc" v-if="index!=check"></i>
                <span>{{item}}</span>

                <input type="radio" :id="radioId+index" name="radio2" class="none" checked="checked" v-if="index==val" :value="index" @click="checked(index)">
                <input type="radio" :id="radioId+index" name="radio2" class="none" v-if="index!=val" :value="index" @click="checked(index)">
            
            </label>
        </template>
     </div>
</template>

<script>
    export default {
      props: ["radioId","list","val"],
        data() {
            return {
               text:this.list,
               check:0,
            }
      },
      watch: {
        val(){
            this.check=this.val;
        },
      },
      methods:{
        checked(item){
            this.$emit('radio',item);
        }
      }
    }
</script>
<style scoped>
</style>