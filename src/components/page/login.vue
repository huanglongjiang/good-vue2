<template>
    <div id="login" class="position-f left-0 right-0 width-max height-max login">
            <div class="layout position-f radius-3" style=" width:400px; height:450px; left:50%; top:50%; margin-left:-200px; margin-top:-253px; opacity:1;">
            <div class="layout border-bottom-0 border-ddd margin-bottom-30">
                <h3 class="font-size-45 color-primary bold clearfix">
                    <span class="float-left">hlj designs</span>
                </h3>
            </div>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="登录" name="first">
                    <div>
                        <div class="table-default  margin-top-0">
                            <table class="width-max">
                                <tr style="height:50px;">
                                    <td>
                                        <div class="position-r radius-3 input-box"><i class="fa fa-envelope font-size-16 position-a top-13 left-15 color-ccc"></i><input type="text" placeholder="账号 / 邮箱登录" class="input-default height-40 line-height-40 font-size-16 width-max" v-model="form.email"></div>
                                    </td>
                                </tr>
                                <tr style="height:50px;">
                                    <td>
                                         <div class="position-r radius-3 input-box"><i class="fa fa-lock font-size-20 position-a top-12 left-15 color-ccc"></i><input type="password" placeholder="请输入密码" class="input-default height-40 line-height-40 font-size-16 width-max"  v-model="form.pass"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <img src="static/yzm.png" class="width-400">
                                </tr>
                                <tr style="height:80px;">
                                    <td>
                                        <div class="width-398 button button-lg button-primary height-50" style="padding: 15px 24px;" @click="submitForm('update')">登录</div>
                                    </td>
                                </tr>
                            </table> 
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="新用户登录" name="second">
                    <div>
                        <div class="table-default  margin-top-0">
                            <table class="width-max">
                                <tr style="height:50px;">
                                    <td>
                                        <div class="position-r radius-3 input-box"><i class="fa fa-envelope font-size-16 position-a top-13 left-15 color-ccc"></i><input type="text" placeholder="账号 / 邮箱登录" class="input-default height-40 line-height-40 font-size-16 width-max" v-model="form.email"></div>
                                    </td>
                                </tr>
                                <tr style="height:50px;">
                                    <td>
                                        <div class="position-r  radius-3 input-box"><i class="fa fa-user font-size-20 position-a top-12 left-15 color-ccc"></i><input type="text" placeholder="请输入用户名" class="input-default height-40 line-height-40 font-size-16 width-max" v-model="form.name"></div>  
                                    </td>
                                </tr>
                                <tr>
                                    <img src="static/yzm.png" class="width-400">
                                </tr>
                                <tr style="height:80px;">
                                    <td>
                                        <div class="width-398 button button-lg button-primary height-50" style="padding: 15px 24px;" @click="submitForm('insert')">登录</div>
                                    </td>
                                </tr>
                            </table> 
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="padding-top-36 line-height-20 align-center font-size-16 margin-top-0">
                <a class="inline-block none-line" href="http://good1230.com" target="_blank">
                    <i class="fa fa-home font-size-20  float-left color-999" style="color: rgb(85, 85, 85);"></i>
                    <span class="padding-left-5 color-999" style="color: rgb(85, 85, 85);">Home</span>
                </a>
                <a class="inline-block margin-left-30 none-line" href="https://github.com/huanglongjiang/good-vue2" target="_blank">
                    <i class="fa fa-github font-size-20  float-left color-999" style="color: rgb(85, 85, 85);"></i>
                    <span class="padding-left-5 color-999" style="color: rgb(85, 85, 85);">Github</span>
                </a>
            </div>
            
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                activeName: 'second',
                form:{
                    name: '',
                    email:'',
                    pass:'',
                    origin:'1',
                },
            }
        },
        methods: {
            submitForm(type){
                const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
                let data={
                    "google":"t-10000",
                    "operating":"login",
                    "type":type,
                    "form":this.form,
                }
                if(!reg.test(this.form.email)){
                   this.$message({
                      message: '请输入正确邮箱',
                      type: 'info'
                    });
                  return
                }

                this.$axios.post(global.APIPATH,data).then(res => { 
                    if(res.data.retType=='success'){
                       localStorage.token = res.data.token;
                       this.$router.push('/role');
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
.login .el-tabs__item.is-active{font-weight: bold;color: #4fc08d; font-size: 18px;}
.login .el-tabs__item:hover{color: #4fc08d;}
#login input{
  color: #5d6d81;
  border: 0px!important;
  padding-left: 40px;
  font-size:14px;
  background:#f1f3f5; font-family: georgia; border-width: 0px 0px 1px; border-top-style: initial; border-right-style: initial; border-bottom-style: solid; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: rgb(238, 238, 238); border-left-color: initial; border-image: initial; box-shadow: none;
}
#login  .input-box{
  border:1px solid #c5cdd7;
  box-shadow:0px 0px 0px #c5cdd7;
  background: #f1f3f5;
  width: 398px;
 }
</style>