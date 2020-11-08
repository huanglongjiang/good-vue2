<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.system" />
        <div class="layout">
            <div class="table-default">
                <table style="width:800px;">
                    <tbody>
                        <tr>
                            <tds-label>标题</tds-label>
                            <td><good-input v-model="form.title" placeholder="请输入内容"></good-input></td>
                        </tr>
                        <tr>
                            <tds-label>副标题</tds-label>
                            <td><good-input v-model="form.title2" placeholder="请输入内容"></good-input></td>
                        </tr>
                        <tr>
                            <tds-label>站点地址</tds-label>
                            <td><good-input v-model="form.url" placeholder="请输入内容"></good-input></td>
                        </tr>
                        <tr>
                            <tds-label class=" position-r">
                               <div class="position-a top-10 right-10">前台LOGO</div>
                            </tds-label>                  
                            <td>
                                <good-upload id="u2" type="logo" :data.sync='form' v-if="state.permission.system_upload"></good-upload>
                                <img class="width-150 height-150 radius-3" :src="filePath+'/'+form.file" v-else>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <good-button type="primary" v-if="state.permission.system_edit" @click="Submit()">保存修改</good-button>
                            </td>
                        </tr>

                    </tbody>
                </table> 
            </div>
        </div>
    </good-page>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data: function(){
            return {
                filePath:global.filePath,
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
        computed: {
            ...mapState(['state']),
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