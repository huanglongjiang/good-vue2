<template>
     <div class="layout">
     
        

        <template v-if="state.authority==3">
            <i class="pointer fa fa-toggle-on font-size-24 color-on" v-if="val.status==2" @click="checked(val.status)"></i>
            <i class="pointer fa fa-toggle-off font-size-24 color-off" v-if="val.status==1" @click="checked(val.status)"></i>
        </template>
        <template v-else>
          <i class="fa fa-toggle-on font-size-24 color-on" v-if="val.status==2"></i>
          <i class="fa fa-toggle-off font-size-24 color-off" v-if="val.status==1"></i>
        </template>
     </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["total","random","val"],
      data() {
          return {
             check:this.val,
          }
      },
      computed: {
            ...mapState(['state']),
        },
      watch: {
        random(){
            this.check=this.val;
        },
      },
      methods:{
        //数据状态
        checked(item){
            if(this.total==''){
                var data={
                  "google":this.check.coding,
                  "operating":"status",
                  "id":this.check.id,
                  "status":this.check.status,
                }
            }else{
                var data={
                  "google":this.total,
                  "operating":"status",
                  "id":this.check.id,
                  "status":this.check.status,
                }
            }
            this.$axios.post(global.APIPATH,data).then(res => {
              if(res.data.result=="success"){
                this.$emit('radio',item);      
                if(this.val.status==1){
                  this.val.status=2
                }else{
                  this.val.status=1
                } 
              }
                          
            });
            
        },
      }
    }
</script>