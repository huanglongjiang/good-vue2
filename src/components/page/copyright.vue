<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.copyright" />
        <div class="layout">
            <div class="table-default">
                <table style="width:800px;">
                    <tbody>
                        <tr>
                            <tds-label>版权信息</tds-label>
                            <td><good-input v-model="form.title" placeholder="请输入内容"></good-input></td>
                        </tr>
                        <tr>
                            <tds-label>版权所有</tds-label>
                            <td><good-input v-model="form.title2" placeholder="请输入内容"></good-input></td>
                        </tr>
                        <tr>
                            <tds-label>版权链接</tds-label>
                            <td><good-input v-model="form.url" placeholder="请输入内容"></good-input></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <good-button type="primary" v-if="state.permission.copyright_edit" @click="Submit()">保存修改</good-button>
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
                google:"t-10004",
                form:{
                    id:'',
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
            ...mapState(['state'])
        },
        methods: {
            submitForm(){
                let data={
                    "google":this.google,
                    "operating":"select",
                    "logo":this.form.logo,
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
     
        },
    }
</script>