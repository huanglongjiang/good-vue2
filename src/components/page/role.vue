<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.role" />
        <good-menu>
            <good-search class="float-left margin-right-10" v-model="init.title"></good-search>
            <good-button class='float-right' icon="el-icon-edit" type="primary" @click="openSlider">新增角色</good-button>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th>角色名称</th>
                            <th >描述</th>
                            <th>编辑状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}">
                                <td><span>{{item.title}}</span></td>
                                <td>{{item.text}}</td>
                                <td>
                                    <good-status :val='item' :key="index"></good-status>
                                </td>
                                <td>
                                    <!-- <span class="margin-right-10 color-ccc" v-if="item.status==0">权限配置</span> -->
                                    <span class="a-link margin-right-10 pointer" v-if="item.status==0" @click="select2(item)">权限查看</span>
                                    <span class="a-link margin-right-10 pointer" v-else @click="select2(item)">权限配置</span>
                                    <good-button2 v-if="item.status==1" @click="select(item)">改</good-button2>

                                    <!-- <good-button2 v-if="item.status==1" @click="remove(item)">弃</good-button2> -->
                                </td>
                            </tr>
                        </template>    
                    </tbody>
                </table> 
            </div>
        </good-box>
        <good-pagination :page.sync="init"></good-pagination>
        <!-- 模态框 -->
          <good-dialog :title="roleTitle" :visible.sync='dialogVisible'>
            <div slot="body">
            <div class="table-default">
                <table class="table-group line-height-30 width-max">
                    <tr>
                        <tds-label star>角色名称：</tds-label>
                        <td><el-input v-model="form.title" placeholder="请输入内容"></el-input></td>
                    </tr>

                    <tr>
                        <tds-label>描述：</tds-label>
                        <td><el-input v-model="form.text" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <!-- <tr>
                        <tds-label>服务状态：</tds-label>
                        <td>
                            <el-radio v-model="form.status" label="0">关闭</el-radio>
                            <el-radio v-model="form.status" label="1">开启</el-radio>
                        </td>
                    </tr> -->
                </table> 
            </div> 
            </div>
            <div slot="footer">
                <good-button type="default" @click="dialogVisible = false">取 消</good-button>
                <good-button type="primary" @click="Submit('insert')" v-if="btnSubmit==0">确 定</good-button>
                <good-button type="primary" @click="Submit('update')" v-else>确 定</good-button>
            </div>
        </good-dialog>

        <good-dialog :title="roleTitle2" :visible.sync='dialogVisible2'>
            <div slot="body">
            <div class="table-data">
            <el-tree
              :data="listTitle"
              show-checkbox
              node-key="id"
              ref="tree"
              default-expand-all
              :default-checked-keys='authorityId'
              @check-change="handleCheckChange">

              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span class="color-999">{{ node.label }}</span>
                <span class="padding-left-30 color-ccc" v-if="data.type==0">目录</span>
                <span class="padding-left-30 color-ccc" v-if="data.type==1">路由菜单</span>
                <span class="padding-left-30 color-ccc" v-if="data.type==2">按钮</span>
              </span>
            </el-tree>
            </div>  
            </div>
            <div slot="footer" v-if="viewStatus==1">
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
                viewStatus:0,
                listTitle:[],
                filePath:global.filePath,
                dialogVisible:false,
                dialogVisible2:false,
                statusVal2:true,
                list:'',
                selected: [],
                random:'',
                google:"t-20013",
                btnSubmit:0,
                roleTitle:'新增角色',
                roleTitle2:'',
                init:{
                    title:'',
                    type:'',
                    status:'',
                    pagesize:10,
                    page:0,
                    total:0,
                    currentPage1:1,
                },
                authorityId:[],
                authorityId2:[],
                form:{
                    id:0,
                    title:'',
                    authorityId:'',
                    text:'',
                    status:'1',
                },
                params:{
                    type:'',
                    status:'',
                }
            }
        },
        watch: {  
            'random': 'dataList',
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
            this.dataList2();
        },
        methods: {
            handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
               /* if(this.authorityId.includes(data.id)){
                    this.authorityId.map((item2,i)=>{
                        if(data.id==item2){
                            this.authorityId.splice(i,1);
                        }
                    })
                }else{
                    this.authorityId.push(data.id)
                }*/
          
                //this.authorityId=[];
                //let res = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
                //this.authorityId2=res
                let res = this.$refs.tree.getCheckedKeys()
                this.authorityId=[...res]
                console.log(res)
             
          },
            dataList2(){
                const data={
                    "google":"t-20012",
                    "operating":"lists",
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.listTitle=res.data.data;
            
                });
            },


            dataList(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                    "title":this.init.title,
                    "type":this.init.type,
                    "status":this.init.status,
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                 
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.init.total=res.data.total;
                });
            },
            openSlider(){
                this.dialogVisible=true;
                this.btnSubmit=0;
                this.roleTitle="新增角色";
                this.authorityId=[];
                this.form={
                    id:0,
                    title:'',
                    authorityId:'',
                    text:'',
                    status:'1',
                };
            },
            select(item){
                this.authorityId=[];
                this.dialogVisible=true;
                this.btnSubmit=1;
                this.roleTitle="编辑角色";
                this.form={...item}
            },

            select2(item){
                console.log(item)
                this.dialogVisible2=true;
                this.viewStatus=item.status;
                this.btnSubmit=1;
                this.roleTitle2=item.title;
                this.authorityId=[];
                if(item.authorityId!=''){
                   this.authorityId=item.authorityId.split(',');
                }
                this.form={...item}
            },
            Submit(operating){
                this.form.authorityId=this.authorityId.join(',');
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
            //删除数据
            remove(item){
                const options={
                    type:"info",
                    visible:true,
                    msg:"此操作将永久删除该文件, 是否继续?",
                    data:"操作成功",
                }
                this.$hlj.confirm(options).then(res=>{
                    const data={
                        "google":item.coding,
                        "operating":"delete",
                        "id":item.id,
                    }
                    this.$axios.post(global.APIPATH,data).then(res => {
                        if(res.data.retType=='success'){
                            this.dataList();
                        }      
                    })
                })
            },
        },

    }
</script>
