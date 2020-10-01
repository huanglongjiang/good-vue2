<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
<div class="layout margin-10">
            
            <ol class="breadbar">
              <li><a>后台管理平台</a></li>
              <li class="active">安装检测</li>
            </ol>
            <div class="clear"></div>
        </div>



        <div class="layout">
            <div class="table-default" style="margin:0px">
            {{form}}
            <table class="table-group">
        
                <tbody>
                    <tr class="height-50">
                        <td width="120" class="align-right">数据库连接地址：</td>
                        <td><input type="text" id="title" class="input-default input-h32 width-400" value="canvas" v-model="form.localhost"></td>
                    </tr>
                    <tr class="height-50">
                        <td width="120" class="align-right">数据库用户名：</td>
                        <td><input type="text" id="title" class="input-default input-h32 width-400" value="canvas" v-model="form.dataname"></td>
                    </tr>
                    <tr class="height-50">
                        <td class="align-right">数据库密码：</td>
                        <td><input type="text" id="title" class="input-default input-h32 width-400" value="canvas" v-model="form.datapass"></td>
                    </tr>
                    <tr class="height-50">
                        <td class="align-right">数据库名称：</td>
                        <td><input type="text" id="title" class="input-default input-h32 width-400" value="canvas" v-model="form.datadb"></td>
                    </tr>
                </tbody>
            </table> 

            </div>
        </div>
        <div class="layout margin-top-20 margin-left-120">
            <div id="edit" class="button button-primary button-md float-left" @click="Submit()">数据库连接检测</div>
            <div id="edit" class="button button-info button-md float-left margin-left-10" @click="Install()">开始安装程序</div>
        </div>
</div>
</template>

<script>
    export default {
        data: function(){
            return {
                form:{
                    localhost:'bdm12360461.my3w.com',
                    dataname:'bdm12360461',
                    datapass:'longjiang100',
                    datadb:'bdm12360461_db'
                },
            }
        },
        mounted: function() {
            this.submitForm();
        },
        methods: {
            
          
            Submit(){
           
                let data={
                    form:this.form,
                }
                this.$axios.post("http://127.0.0.1/300/conn.php",data).then(res => {    
                    
                    model("loading",res.data.result);
                });
            },
            Install(){
           
                let data={
                    form:this.form,
                }
                this.$axios.post("http://127.0.0.1/300/createtemplate.php",data).then(res => {    
                    
                    model("loading",res.data.result);
                });
            },
     
        },
    }
</script>
