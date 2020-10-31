<template>
    <div>
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
         
          :default-checked-keys="[5]"
          :props="defaultProps">
        </el-tree>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
               data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
            }
        },
        methods: {
            submitForm(){
                let data={
                    "google":"t-10000",
                    "operating":"login",
                    "type":"update",
                    "form":this.form,
                }
                this.$axios.post(global.APIPATH,data).then(res => { 
                    if(res.data.retType=='success'){
                       localStorage.token = res.data.token;
                       this.$router.push('/index');
                   }
                        
                });
            },
        }
    }
</script>
<style scoped>

  .a-link{color: #0084FF}
  .button-primary{box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.4);}
  .button-primary:hover{box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.4);}
  
</style>
<style type="text/css">
.login .el-tabs__item.is-active{font-weight: bold;color: #4fb845; font-size: 18px;}

</style>