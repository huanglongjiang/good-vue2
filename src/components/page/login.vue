<template>
    <div class="position-f left-0 right-0 width-max height-max">
            <div class="layout position-f radius-3" style=" width:400px; height:300px; left:50%; top:50%; margin-left:-200px; margin-top:-150px; opacity:1;">
            <div class="layout border-bottom-0 border-ddd margin-bottom-30">
                <h3 class="font-size-36 color-primary bold clearfix">
                    <span class="float-left">hlj designs</span>
                </h3>
            </div>
            <div id="form">
                <div class="table-default  margin-top-0">
                    <table class="width-max">
                        <tr style="height:50px;">
                            <td>
                                <div class="position-r">
                                    <i class="fa fa-user font-size-18 position-a top-12 left-15 color-ccc"></i>
                                    <input type="text" class="input-default height-40 line-height-40 font-size-16 width-max text-indent-25" placeholder="请输入用户名" v-model="form.email" style="background:#f1f3f5;font-family: georgia;border:0px; border-bottom:1px solid #eee;box-shadow:none;">
                                </div>
                            </td>
                        </tr>
                        <tr style="height:50px;">
                            <td>
                                <div class="position-r">
                                    <i class="fa fa-lock font-size-18 position-a top-12 left-15 color-ccc"></i>
                                    <input type="password" class="input-default height-40 line-height-40 font-size-16 width-max text-indent-25" placeholder="请输入密码"  v-model="form.pass" style="background:#f1f3f5;border:0px; border-bottom:1px solid #eee;box-shadow:none;">
                                 </div>   
                            </td>
                        </tr>
                        <tr style="height:80px;">
                            <td>
                                <div class="width-max button button-lg button-primary height-50" @click="submitForm()">登录</div>
                            </td>
                        </tr>
                    </table> 
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form:{
                    email:'Lucie@163.com',
                    pass:'123456',
                },
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
                   localStorage.token = res.data.token;
                   this.$router.push('/log');
                        
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