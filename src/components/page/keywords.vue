<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <good-breadcrumb :list="constant.breadcrumb.keywords" />
        <good-menu>
            <good-search class="float-left margin-right-10" v-model="filterText"></good-search>
            <good-button class='float-right' type="primary" @click="openColumn('新增关键词')">新增栏目</good-button>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>
        
        <good-box :data="viewList">
            <div class="align-center clearfix">
                <template v-for="(item,index) in viewList">
                   
                    <div class="layout margin-bottom-10 pointer" @click="select(item,'编辑关键词')">
                        <el-tag type="info" class="float-left margin-5">{{item.name}}</el-tag>
                    </div>
                </template> 
            </div>
        </good-box>  
        <good-pagination :page.sync="init"></good-pagination>
         <!-- 模态框 -->
        <good-dialog :title="columnTitle" :visible.sync='dialogVisible'>
            <div slot="body">
            <div class="table-default" style="margin:0px">
                <table class="table-group">
                    <tr>
                        <tds-label star>名称：</tds-label>
                        <td><good-input v-model="form.name"></good-input></td>
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
</div>
</template>

<script>
    export default {
        data: function(){
            return {
                dialogVisible:false,
                btnSubmit:0,
                columnTitle:'新增栏目',
                listTitle:[],
                filterText:"",
                google:"t-20006",
                init:{
                    name:'',
                    total:0,
                    pagesize:250,
                    page:0,
                },
                rows:0,
                form:{
                    id:0,
                    name:'',
                },
                currentPage1: 1,
            }
        },
        computed: {
            // 搜索功能
            viewList(){
                const arr = [];
                if(this.listTitle==null){return}
                this.listTitle.forEach((item,index)=>{
                    if(this.filterText !== '' && item.name.includes(this.filterText)){
                        arr.push(item);
                    }else if(this.filterText === ''){
                        arr.push(item);
                    }
                });
                return arr;
            }
        },
        created: function() {
            this.dataList();
        },
        watch: { 
            'init.page': 'dataList',
            'init.pagesize': 'dataList',
        }, 
        methods: {
            
            dataList(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                    "name":this.init.name,
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.listTitle=res.data.data;
                    this.init.total=res.data.total;
                });
            },
            select(item,title){
                this.dialogVisible=true;
                this.result="";
                this.btnSubmit=1;
                this.columnTitle=title;
                const data={
                    "google":item.coding,
                    "operating":"select",
                    "id":item.id,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                       this.form=res.data.data;
                    });
            },
            openColumn(title){
                this.dialogVisible=true;
                this.result="";
                this.btnSubmit=0;
                this.columnTitle=title;
                this.form={
                    name:'',
                };
            },
       
            Submit(string){
                const data={
                    "google":this.google,
                    "operating":string,
                    "form":this.form
                }
                this.$axios.post(global.APIPATH,data).then(res => {  
                    if(res.data.retType=='success'){
                        this.dialogVisible=false,
                        this.dataList();
                    }
                });
            },
        },
    }
</script>
<style scoped>
   .tag-group .tag-block{display: inline-table;}
   .tag-group .tag-block:hover{color: #333;}
</style>