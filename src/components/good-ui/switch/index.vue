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
      props: ["val"],
      data() {
          return {
          }
      },
      computed: {
            ...mapState(['state']),
        },
      methods:{
        //数据状态
        checked(item){
            const data={
              "google":this.val.coding,
              "operating":"status",
              "id":this.val.id,
              "status":this.val.status,
            }

            
            this.$axios.post(global.APIPATH,data).then(res => {
              if(res.status==200){
                this.val.status=this.val.status==1?0:1;
                this.$emit('update:val', this.val);
              }
                          
            });
            
        },
      }
    }
</script>