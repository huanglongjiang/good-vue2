<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.system" />
        <div class="layout">
            <div class="table-default">
                <table style="width:800px;">
                    <tbody>
                        <tr>
                            <tds-label>标题：</tds-label>
                            <td><el-input v-model="form.title" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>副标题：</tds-label>
                            <td><el-input v-model="form.title2" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>站点地址：</tds-label>
                            <td><el-input v-model="form.url" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label class=" position-r">前台LOGO：</tds-label>                    
                            <td>
                                <good-upload id="u2" type="logo" :data.sync='form'></good-upload>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <good-button type="primary" @click="Submit()">保存修改</good-button>
                            </td>
                        </tr>

                    </tbody>
                </table> 
            </div>
        </div>
    </good-page>
</template>

<script>
    export default {
        data: function(){
            return {
                google:"t-10005",
                form:{"coding": "t-10004",
                    id:'',
                    image:'',
                    file:'',
                    title:'',
                    title2:'',
                    url:''
                },
            }
        },
        created: function() {
            this.submitForm();
        },
        methods: {
            submitForm(){
                let data={
                    "google":this.google,
                    "operating":"select",
                    "image":this.form.image,
                    "file":this.form.file,
                    "title":this.form.title,
                    "title2":this.form.title2,
                    "url":this.form.url,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.form=res.data.data;
                });
            },
            Submit(){
                let data={
                    "google":this.google,
                    "operating":"update",
                    "form":this.form
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.submitForm();
                });
            },
            imgName(item){
                this.form.logo=item;
            }
     
        },
    }
</script>