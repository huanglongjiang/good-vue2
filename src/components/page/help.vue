<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.help" />
        <good-box data="true">
        <good-tag tagName="服务类型" :list="constant.filter.help.type" :selected.sync='init.type' />
        <good-tag tagName="服务状态" :list="constant.filter.help.status" :selected.sync='init.status' />
        </good-box>
        
        <good-menu>
            <good-search class="float-left margin-right-10" v-model="init.name"></good-search>
            <good-statusall :google="google" :selected="selected" v-if="state.permission.help_status_all" :random.sync='random'></good-statusall>
            <good-button class='float-right' type="primary" v-if="state.permission.help_add" @click="openHelp">新增客服</good-button>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>

        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th v-if="state.permission.help_status_all">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th>
                            <th>类型</th>
                            <th>用户名</th>
                            <th>QQ</th>
                            <th>状态</th>
                            <th>操作</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}">
                                <td v-if="state.permission.help_status_all">
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else>选择</template>
                                    </good-checkbox>
                                </td>
                                <td>    
                                    <good-label background="background-one" v-if="item.type==0">咨询客服</good-label>
                                    <good-label background="background-two" v-if="item.type==1">技术客服</good-label>
                                    <good-label background="background-three" v-if="item.type==2">售后客服</good-label>
                                </td>

                                
                                <td>{{item.name}}</td>
                                <td>{{item.qq}}</td>
                                <td>
                                    <good-switch :val.sync='item' :aaa.sync='statusVal' :key="index" v-if="state.permission.help_status"></good-switch>
                                    <good-status :val='item' :key="index" v-else></good-status>
                                </td>
                                <td>
                                    <good-button2 v-if="state.permission.help_edit" @click="select(item)">改</good-button2>
                                    <good-button2 v-if="state.permission.help_delete" @click="remove(item)">弃</good-button2>
                                </td>
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>
        </good-box>
        <good-pagination :page.sync="init"></good-pagination>

        <!-- 模态框 -->

        <good-dialog :title="helpTitle" :visible.sync='dialogVisible'>
            <div slot="body">
                <div class="table-default">
                    <table class="table-group">
                        
                        
                        <tr>
                            <tds-label star>用户名：</tds-label>
                            <td><el-input v-model="form.name" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label star>QQ：</tds-label>
                            <td><el-input v-model="form.qq" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>代码标签：</tds-label>
                            <td><el-input v-model="'{$qq.'+form.id+'}'" :disabled="true" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>用户类型：</tds-label>
                            <td>
                                <el-radio v-model="form.type" label="0">咨询客服</el-radio>
                                <el-radio v-model="form.type" label="1">技术客服</el-radio>
                                <el-radio v-model="form.type" label="2">售后客服</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <tds-label>服务状态：</tds-label>
                            <td>

                                <el-radio v-model="form.status" label="0">关闭</el-radio>
                                <el-radio v-model="form.status" label="1">开启</el-radio>
                            </td>
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
                dialogVisible:false,
                typeVal:0,
                btnSubmit:0,
                statusVal:0,
                helpTitle:'新增栏目',
                list:'',
                selected: [],
                random:'',
                google:"t-10011",
                init:{
                    type:'',
                    status:'',
                    name:'',
                    pagesize:10,
                    page:0,
                    total:0,
                    currentPage1:1,
                },
                form:{
                    id:0,
                    type:'0',
                    name:'',
                    email:'',
                    pass:'',
                    status:'1',
                },
                params:{
                    type:'',
                    status:'',
                }
            }
        },
        created: function() {
            this.dataList();
        },
        watch: {  
            'random': 'dataList',
            'init.name': 'dataList',
            'init.page': 'dataList',
            'init.pagesize': 'dataList',
            'init.type':'dataList',
            'init.status':'dataList',
        }, 
        computed: {
            ...mapState(['state']),
            selectAll: {
                get: function () {
                  return this.list ? this.selected.length == this.list.length : false;
                },
                set: function (value) {
                  var selected = [];
                  if (value) {
                      this.list.forEach(function (item) {
                          selected.push(item.id);
                      });
                  }
                  this.selected = selected;
                }
            }
        },
        created() {
            this.$route.query.type=="all"?this.init.type='':this.init.type=this.$route.query.type;
            this.dataList();
        },
        methods: {
            dataList(){
                let data={
                    "google":this.google,
                    "operating":"lists",
                    "type":this.init.type,
                    "status":this.init.status,
                    "name":this.init.name,
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.init.total=res.data.total;
                });
            },
            select(item){
                this.dialogVisible=true;
                this.btnSubmit=1;
                this.helpTitle="编辑客服";
                this.form={...item}
            },
            openHelp(){
                this.dialogVisible=true;
                this.btnSubmit=0;
                this.helpTitle="新增客服";
                this.form={
                    id:0,
                    type:'0',
                    qq:'',
                    name:'',
                    status:'1',
                };
            },
            Submit(operating){
                let data={
                    "google":this.google,
                    "operating":operating,
                    "form":this.form
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    if(res.data.retType=='success'){
                        this.dialogVisible = false;
                        this.dataList();
                    }
                });
            },
            //删除数据
            remove(item){
                let options={
                    type:"info",
                    visible:true,
                    msg:"此操作将永久删除该文件, 是否继续?",
                    data:"操作成功",
                }
                this.$hlj.confirm(options).then(res=>{
                    const data={
                        "google":this.google,
                        "operating":"delete",
                        "id":item.id,
                    }
                    this.$axios.post(global.APIPATH,data).then(res => {
                        if(res.status===200){
                            this.dataList(); 
                        }                        
                    });
                })
            },
            /*//删除数据
            remove(item){

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const data={
                            "google":item.coding,
                            "operating":"delete",
                            "id":item.id,
                        }
                        this.$axios.post(global.APIPATH,data).then(res => {
                            if(res.status==200){
                                this.dataList(); 
                            }       
                        })
                    })


            },*/
     
        },
    }
</script>