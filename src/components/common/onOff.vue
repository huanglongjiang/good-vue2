<template>
  <div class="layout">
    <div class="layout container">
    <div class="switch" :class="{'a':val.status==1}" @click="checked(val)">
      <span class="switch-label" data-on="on" data-off="off"></span>
      <span class="switch-handle"></span>
    </div>
  </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["val",'aaa'],
      data() {
          return {
             check:this.val,
             bb:this.aaa,
          }
      },
      computed: {
            ...mapState(['state']),
        },
      methods:{
        //数据状态
        checked(item){
            this.bb=!this.bb
            const data={
              "google":this.check.coding,
              "operating":"status",
              "id":this.check.id,
              "status":this.check.status,
            }

            this.$axios.post(global.APIPATH,data).then(res => {
              if(res.data.result=="success"){
                this.$emit('update:val', this.check);
                this.check.status=this.check.status==1?0:1;
              }
                          
            });
            
        },
      }
    }
</script>