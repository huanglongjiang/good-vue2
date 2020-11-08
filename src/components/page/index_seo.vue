<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.index_seo" />
        <div class="layout">
            <div class="table-default">
                <table style="width:800px;">
                    <tbody>
                        <tr>
                            <tds-label>标题</tds-label>
                            <td><good-input v-model="form.title" placeholder="请输入内容"></good-input></td>
                        </tr>
                        <tr>
                            <tds-label>关键词</tds-label>
                            <td><good-input v-model="form.keywords" placeholder="请输入内容"></good-input></td>
                        </tr>
                        <tr>
                            <tds-label class=" position-r">
                               <div class="position-a top-10 right-10">网页描述</div>
                            </tds-label>
                            <td><el-input type="textarea" :rows="6" v-model="form.description" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td class="padding-top-10">
                                <good-button type="primary" v-if="state.permission.index_seo_edit" @click="Submit()">保存修改</good-button>
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
                google:"t-10006",
                form:{
                    id:'',
                    title:'',
                    keywords:'',
                    description:''
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
                    "title":this.form.title,
                    "keywords":this.form.keywords,
                    "description":this.form.description,
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