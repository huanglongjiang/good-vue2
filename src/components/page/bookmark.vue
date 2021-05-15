<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.bookmark" />
        <good-menu>
            <template v-if="state.authority==2">
                <good-button class='float-right' icon="el-icon-edit" type="primary" v-if="state.permission.bookmark_add" @click="openSlider">新增书签</good-button>
            </template>
            <template v-else>
                <good-button class='float-right no-drop' icon="el-icon-edit" type="primary" v-if="state.permission.bookmark_add">新增书签</good-button>
            </template>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-200">标题</th>
                            <th class="width-200">网址/Git</th>
                            <th class="width-200">备注</th>
                            <th class="width-100">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr  :key="item.id">
                                <td>
                                    <span style="min-width:20px" class="padding-left-5 padding-right-5 height-20 block radius-20 align-center line-height-20 color-white float-left position-r top-5 font-size-12 margin-right-10" :class="setBackground(index)">
                                        {{item.id}}</span>{{item.title}}</td>
                                <td><a class="a-link" :href="item.url" target="_blank">{{item.url}}</a></td>
                                <td>{{item.text?item.text:'-'}}</td>
                                <td>
                                    <template v-if="state.authority==2">
                                        <good-button2 v-if="state.permission.slider_edit" @click="select(item)">改</good-button2>
                                        <good-button2 class="no-drop" v-if="state.permission.slider_delete">弃</good-button2>
                                        <!-- <good-button2 v-if="state.permission.slider_delete" @click="remove(item)">弃</good-button2> -->
                                    </template>
                                    <template v-else>
                                        <good-button2 class="no-drop" v-if="state.permission.slider_edit">改</good-button2>
                                        <good-button2 class="no-drop" v-if="state.permission.slider_delete">弃</good-button2>
                                    </template>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table> 
            </div>
        </good-box>
        <good-pagination :page.sync="init"></good-pagination>
        <!-- 模态框 -->
          <good-dialog :title="bookmarkTitle" :visible.sync='dialogVisible'>
            <div slot="body">
            <div class="table-default">
                <table class="table-group line-height-30 width-max">
                    <tr>
                        <tds-label star>书签名</tds-label>
                        <td><good-input v-model="form.title" placeholder="请输入内容"></good-input></td>
                    </tr>

                    <tr>
                        <tds-label>书签地址</tds-label>
                        <td><el-input type="textarea" class="padding-bottom-10" :rows="6" v-model="form.url" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label>备注</tds-label>
                        <td><el-input type="textarea" :rows="6" v-model="form.text" placeholder="请输入内容"></el-input></td>
                    </tr>
                </table> 
            </div>
            </div>
            <div slot="footer">
                <good-button type="default" @click="dialogVisible = false">取 消</good-button>
                <good-button type="primary" @click="Submit('insert')" v-if="btnSubmit==0">确 定</good-button>
                <good-button type="primary" @click="Submit('update')" v-else>确 定</good-button>
            </div>
        </good-dialog>

        <!-- 模态框 -->
    </good-page>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data: function(){
            return {
                filePath:global.filePath,
                list:'',
                google:"t-20009",
                btnSubmit:0,
                bookmarkTitle:'新增书签',
                dialogVisible:false,
                init:{
                    pagesize:10,
                    page:0 ,
                    total:0,
                    currentPage1:1,
                },
                form:{
                    id:'',
                    title:'',
                    url:'',
                    url2:'',
                    text:'',
                },
            }
        },
        computed: {
            ...mapState(['state'])
        },
        created: function() {
            this.dataList();
        },
        watch: {
            'init.page': 'dataList',
            'init.pagesize': 'dataList',
        },
        methods: {
            setBackground(item){
               return item===0?'background-one':
               item===1?'background-two':
               item===2?'background-three':'background-ddd'
            },
            dataList(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.init.total=res.data.total;
                })
            },
            openSlider(){
                this.dialogVisible=true;
                this.btnSubmit=0;
                this.bookmarkTitle="新增书签";
                this.form={
                        id:0,
                        type:'0',
                        title:'',
                        image:'',
                        url:'',
                        status:'1',
                };
            },
            select(item){
                this.dialogVisible=true;
                this.btnSubmit=1;
                this.bookmarkTitle="编辑书签";
                this.form={...item}
            },
            Submit(operating){
                const data={
                    "google":this.google,
                    "operating":operating,
                    "form":this.form
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    if(res.status==200){ 
                        this.dialogVisible = false;
                        this.dataList();
                    }
                });
            },
     
        },
    }
</script>