<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <breadBar :list="constant.breadcrumb.user" />
        <Selector class=" margin-left-10 margin-right-10" type="type" tagName="用户角色" :list="constant.filter.user.type" :selected='params.type' @getBack="tabRole" />
        <Selector class=" margin-left-10 margin-right-10" type="status" tagName="服务状态" :list="constant.filter.user.status" :selected='params.status' @getBack="tabStatus" />
        <div class="layout background-white border-default padding-10 background-eee margin-left-10 margin-right-10" style="border-bottom:0px">
            <div class="float-left">
                <div class="search-group">
                      <input type="text" class="input-default float-left border-right width-250" placeholder="请输入用户名..." v-model="init.name">
                      <div class="search-button-ico float-left fa fa-search" @click="dataList()"></div>
                </div>
            </div>
            <div class="button button-primary button-md margin-left-20 float-right font-size-14" data-popover="modal-animate" data-target="#model1" @click="openUser()">
            <i class="button-ico fa fa-plus-square"></i>权限设置</div>
            
            <div class="clear"></div>
        </div>
        <div class="layout width-max padding-left-10 padding-right-10"> 
            <div class="table-data" style="margin:0px">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th>用户名</th>
                            <template v-for="item in 6">
                            <th>用户头像</th>
                            </template>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-eee':item.status==0}">
                                <td><span class="textline a-link">{{item.name}}</span></td>
                                <template v-for="item in 6">
                                    <td>
                                       <Radio2></Radio2>
                                    </td>
                                </template>
                                
                                <!-- <td><span class="textline a-link">{{item.email}}</span></td>
                                
                                <td>{{item.time}}</td>
                                <td>
                                    <span class="background-one radius-3 padding-2 padding-left-5 padding-right-5 color-white" v-if="item.role=='0'">普通用户</span>
                                
                                    <span class="background-two radius-3 padding-2 padding-left-5 padding-right-5 color-white" v-if="item.role=='1'">管理员</span>
                                
                                    <span class="background-three radius-3 padding-2 padding-left-5 padding-right-5 color-white" v-if="item.role=='2'">超级管理员</span>
                                </td>
                                <td><Status :item='item'></Status></td>
                                
                                <template v-if="state.authority==2">
                                     <td>
                                    <a class="a-link pointer" data-popover="modal-animate" data-target="#model1" @click="select(item)">编辑</a>
                                    <a class="a-link pointer" @click="remove(item)">删除</a>
                                    </td>
                                </template>
                                <template v-else>
                                     <td>
                                        <a class="color-ccc">编辑</a>
                                        <a class="color-ccc">删除</a>
                                    </td>
                                </template> -->
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>
        </div>
        <div class="layout clearfix">
            
        </div>
        <div class="layout margin-bottom-10 color-ccc float-left margin-top-10  margin-left-10 font-size-12"> 
                注：超级管理员可操作此页面
        </div>
        <div class="layout align-right margin-top-10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="init.currentPage1"
              :page-sizes="[10,15,20,25]"
              :page-size="parseInt(init.pagesize)"
              layout="total, sizes, prev, pager, next, jumper"
              :total="parseInt(init.total)">
            </el-pagination>
        </div>
        <!-- 模态框 -->
        
        <Modelbox title="新增用户" :visible.sync='dialogShow'>
          <div class="popover-modal-body" style="font-size:12px">
            <el-tree
              :data="constant.data"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps">
            </el-tree>
              </div>
              <div class="popover-modal-footer position-a" style="bottom: 0px; right: 0px; text-align: right;">
                <div class="button button-primary button-sm" v-if="btnSubmit==0" @click="Submit('insert')">确定</div>
                <div class="button button-primary button-sm" v-else @click="Submit('update')">确定</div>
                <div class="button button-primary button-sm" @click="openUser2()">确定</div>
                
              </div>
        </Modelbox>
        <Modelbox title="新增用户66666666666" :visible.sync='dialogShow2'>
            <div class="popover-modal-footer position-a" style="bottom: 0px; right: 0px; text-align: right;">
                <div class="button button-primary button-sm" @click="dialogShow3=true">确定</div>       
            </div>
            
        </Modelbox>
        <Modelbox title="新增用户88888888888" :visible.sync='dialogShow3'></Modelbox>
        <!-- 模态框 -->
        <editAll :google="google" :selected="selected" :random="Math.round(Math.random()*10000)" @getBack="status"></editAll>

</div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data: function(){
            return {
                dialogTableVisible:false,
                dialogShow:false,
                dialogShow2:false,
                dialogShow3:false,
                randomVal:'',
                list:'',
                selected: [],
                result:'',
                google:"t-10010",
                roleVal:0,
                statusVal:0,
                btnSubmit:0,
                userTitle:'新增栏目',
                init:{
                    role:'',
                    name:'',
                    status:'',
                    pagesize:10,
                    page:0,
                    total:0,
                    currentPage1:1,
                },
                form:{
                    id:0,
                    role:0,
                    name:'',
                    email:'',
                    status:0,
                },
                params:{
                    type:'',
                    status:'',
                }
            }
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
        created: function() {
            this.$route.query.type=="all"?this.init.role='':this.init.role=this.$route.query.type;
            this.$route.query.status=="all"?this.init.status='':this.init.status=this.$route.query.status;
            this.params.type=this.$route.query.type;
            this.params.status=this.$route.query.status;
            this.dataList();
        },

        watch: {  

            'init.role': 'dataList',
            'randomVal': 'dataList',
        }, 
        methods: {
            
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
                this.init.pagesize=val;
                this.dataList();
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                this.init.page=val-1;
                this.dataList();
            },

            dataList(){
                let data={
                    "google":this.google,
                    "operating":"lists",
                    "role":this.init.role,
                    "name":this.init.name,
                    "status":this.init.status,
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                }
              
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.init.total=res.data.total;
                });
            },
            select(item){
                this.dialogShow=true;
                this.result="";
                this.btnSubmit=1;
                this.userTitle="编辑用户";
                let data={
                    "google":"t-10010",
                    "operating":"select",
                    "id":item.id,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                       this.form=res.data.data;
                    });
            },
            
            openUser(){
                this.dialogShow=true;
                this.result="";
                this.btnSubmit=0;
                this.userTitle="新增用户";
                this.form={
                        id:0,
                        role:'0',
                        name:'',
                        email:'',
                        status:1,
                };
            },
            openUser2(){
                this.dialogShow2=true;
            },
            Submit(operating){

                let data={
                    "google":this.google,
                    "operating":operating,
                    "form":this.form
                }
           
                this.$axios.post(global.APIPATH,data).then(res => {    
                    this.result=res.data.result;
                    this.dataList();
                    let options={
                        type:"success",
                        message:res.data.result,
                    }
                    this.$hlj.message(options)
                });
            },
            //数据状态
            status(item){
                this.randomVal=item;
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
                    let data={
                        "google":"t-10014",
                        "operating":"delete",
                        "id":item.id,
                    }
                    this.$axios.post(global.APIPATH,data).then(res => {
                        if(res.status===200){
                            const options={
                                type:"success",
                                message:res.data.result,
                            }
                            this.$hlj.message(options)
                            this.dataList(); 
                        }                        
                    });
                })
            },
            tabRole(val){
                this.currentPage1=1;
                this.init.role=val.id;
                this.roleVal=val;
                this.dataList();
            },
            tabStatus(val){
                this.currentPage1=1;
                this.init.status=val.id;
                this.statusVal=val;
                this.dataList();
            },
        },
    }
</script>