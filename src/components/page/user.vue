 <template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.user" />
        <good-box data="true">
        <good-tag tagName="服务类型" :list="constant.filter.user.type" :selected.sync='init.role' />
        <good-tag tagName="服务状态" :list="constant.filter.user.status" :selected.sync='init.status' />
        </good-box>
        <good-menu>
            <good-search class="float-left margin-right-10" v-model="init.name"></good-search>
            <!-- <good-statusall :google="google" :selected="selected" :random.sync='random'></good-statusall> -->
            <good-button class='float-right' icon="el-icon-edit" type="primary" v-if="state.permission.user_add" @click="openUser">新增用户</good-button>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>
        
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                           <!--  <th style="width:100px;">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th> -->
                            <th>用户头像</th>
                            <th>用户名</th>
                            <th>用户邮箱</th>
                            <th>注册时间</th>
                            <th>类型</th>
                            <th>状态</th>
                            <!-- <th v-if="state.permission.user_edit || state.permission.user_delete">操作</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}">
                                <!-- <td>
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else>选择</template>
                                    </good-checkbox>
                                </td> -->
                                <td>
                                    <div class="line-height-30 padding-3">
                                        <template v-if="item.file!=''">
                                        <img :src="filePath+'/'+item.file" alt="" class="width-30 height-30 radius-20 block" v-if="item.file.length>7">
                                        <img :src="'http://www.good1230.com/good/RandomUser/'+item.file" alt="" class="width-30 height-30 radius-20 block" v-else>
                                    </template>
                                    <template v-else>
                                        <img src="static/images/tianmao.jpg" alt="" class="width-30 height-30 radius-20 block">
                                    </template>
                                    </div>
                                    
                                </td>
                                <td><span>{{item.name}}</span></td>
                                <td><span>{{item.email}}</span></td>
                                
                                <td>{{item.time}}</td>
                                <td>
                                    <good-label background="background-one" v-if="item.role==0">普通用户</good-label>
                                    <good-label background="background-two" v-if="item.role==1">管理员</good-label>
                                    <good-label background="background-three" v-if="item.role==2">超级管理员</good-label>
                                </td>
                                <td>
                                    <good-switch :val.sync='item' :key="index" v-if="constant.authority==2"></good-switch>
                                    <good-status :val='item' :key="index" v-else></good-status>
                                </td>

                                <template>
                                     <!-- <td>
                                        <good-button2 v-if="state.permission.user_edit" @click="select(item)">改</good-button2>
                                        <good-button2 v-if="state.permission.user_delete" @click="remove(item)">弃</good-button2>
                                    </td> -->
                                </template>
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>
        </good-box>
        <div class="layout margin-bottom-10 color-ccc float-left margin-top-10  margin-left-10 font-size-12"> 
                注：超级管理员可操作此页面
        </div>
        <good-pagination :page.sync="init" v-if="list"></good-pagination>
        <!-- 模态框 -->
        
          <good-dialog :title="userTitle" :visible.sync='dialogVisible'>
            <div slot="body">
            <div class="table-default">
                <table class="table-group line-height-30 width-max">
                    
                    <template v-if="userTitle=='新增用户'">
                        <tr>
                            <tds-label star>用户名：</tds-label>
                            <td><el-input v-model="form.name" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label star>用户邮箱：</tds-label>
                            <td><el-input v-model="form.email" placeholder="请输入内容"></el-input></td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <tds-label star>用户名：</tds-label>
                            <td><el-input v-model="form.name" disabled placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label star>用户邮箱：</tds-label>
                            <td><el-input v-model="form.email" disabled placeholder="请输入内容"></el-input></td>
                        </tr>
                    </template>
                    <tr>
                        <tds-label>用户类型：</tds-label>
                        <td>
                            <el-radio v-model="form.role" label="0">普通用户</el-radio>
                            <el-radio v-model="form.role" label="1">管理员</el-radio>
                            <el-radio v-model="form.role" label="2" disabled>超级管理员</el-radio>
                        </td>
                    </tr>
                    <tr>
                        <tds-label>服务状态：</tds-label>
                        <td>
                            <el-radio v-model="form.status" label="0">冻结</el-radio>
                            <el-radio v-model="form.status" label="1">正常</el-radio>
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
                filePath:global.filePath,
                dialogTableVisible:false,
                dialogVisible:false,
                statusVal2:true,
                random:'',
                list:'',
                selected: [],
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
                  const selected = [];
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
            this.dataList();
        },

        watch: {  

            'init.role': 'dataList',
            'random': 'dataList',
            'init.name': 'dataList',
            'init.page': 'dataList',
            'init.pagesize': 'dataList',
            'init.role':'dataList',
            'init.status':'dataList',
        }, 
        methods: {
            dataList(){
                const data={
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
                this.dialogVisible=true;
                this.btnSubmit=1;
                this.userTitle="编辑用户";
                this.form={...item}
            },
            openUser(){
                this.dialogVisible=true;
                this.btnSubmit=0;
                this.userTitle="新增用户";
                this.form={
                        id:0,
                        role:'0',
                        name:'',
                        email:'',
                        status:'1',
                };
            },
            Submit(operating){
                const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!reg.test(this.form.email)){
                    let options={
                          type:'warning',
                          message:'请输入正确邮箱',
                      }
                    this.$message(options);
                    return
                }

                const data={
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
            password(item){
                let options={
                    type:"info",
                    visible:true,
                    msg:"此操作将回复恢复初始密码, 是否继续?",
                    data:"操作成功",
                }
                this.$hlj.confirm(options).then(res=>{
                    const data={
                        "google":this.google,
                        "operating":"delete",
                        "id":item.id,
                    }
                    this.$axios.post(global.APIPATH2,data).then(res => {
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
        },
    }
</script>