<template>
     <div class="layout">
        <template v-for="(item,index) in total">
            <label class="margin-right-10 pointer" :for="'aid'+index">{{check}}
                <i class="zx-icon-radio-checked color-primary" v-if="index+1==check"></i>
                <i class="zx-icon-radio-unchecked color-ccc" v-if="index+1!=check"></i>
                <span>{{item}}</span>

                <input type="radio" :id="'aid'+index" name="radio2" class="none" checked="checked" v-if="index==typeVal" :value="index+1" @click="checked(index+1)">
                <input type="radio" :id="'aid'+index" name="radio2" class="none" v-if="index!=typeVal" :value="index+1" @click="checked(index+1)">
            
            </label>
        </template>
     </div>
</template>

<script>
    export default {
      props: ["total","typeVal"],
        data() {
            return {
               text:this.total,
               check:this.typeVal,
            }
      },
      watch: {
        typeVal(){
            this.check=this.typeVal;
        },
      },
      methods:{
        checked(item){
            this.$emit('radio',item);
            console.log(item)
        }
      }
    }
</script>
<style scoped>
</style>