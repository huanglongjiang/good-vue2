<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.link" />
        <good-box data="true">

        <good-tag tagName="服务类型" :list="constant.filter.link.type" :selected.sync='init.type' />
        <good-tag tagName="服务状态" :list="constant.filter.link.status" :selected.sync='init.status' />
        </good-box>
        <good-menu>
            <good-search class="float-left margin-right-10" v-model="init.link"></good-search>
            <good-time v-model="init.starttime" text="日期"></good-time>
            <good-time v-model="init.endtime" text=" 至" class="margin-left-5"></good-time>
            <good-button class='float-left margin-left-20 margin-right-20' @click="dataList()">查询</good-button>
            <good-statusall :google="google" :selected="selected" :random.sync='random'></good-statusall>
            <good-button class='float-right' icon="el-icon-edit" type="primary" @click="openLink">新增友情链接</good-button>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>
        <good-box :data="list"> 
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th>
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th>
                            <th>网站名称</th>
                            <th>网址</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>类型</th>
                            <th>服务状态</th>
                            <th v-if="constant.authority>0">操作</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}">
                                <td>
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else>选择</template>
                                    </good-checkbox>
                                </td>
                                <td><span class="textline a-link">{{item.name}}</span></td>
                                <td><span class="textline a-link">{{item.link}}</span></td>
                                <td>{{item.starttime,'YYYY-MM-DD' | moment}}</td>
                                <td>{{item.endtime,'YYYY-MM-DD' | moment}}</td>
                                <td>
                                    <good-label background="background-one" v-if="item.type==0">友情链接</good-label>
                                    <good-label background="background-danger" v-if="item.type==1">友情链接2</good-label>
                                    <good-label background="background-success" v-if="item.type==2">全站链接</good-label>
                                    <good-label background="background-danger" v-if="item.type==3">友情链接2</good-label>
                                    <good-label background="background-success" v-if="item.type==4">全站链接</good-label>
                                </td>
                                <td>
                                    <good-switch :val.sync='item' :aaa.sync='statusVal' :key="index"></good-switch>
                                </td>
                                <td>
                                    <good-button2 @click="select(item)">改</good-button2>
                                    <good-button2 @click="remove(item)">弃</good-button2>
                                </td>
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>
        </good-box>
        <good-pagination :page.sync="init"></good-pagination>

        <!-- 模态框 -->
          <good-dialog :title="linkTitle" :visible.sync='dialogVisible'>
            <div slot="body">
                <div class="table-default" style="margin:0px">
                        <table class="table-group">
                            
                            
                            <tr>
                                <tds-label star>网站名称：</tds-label>
                                <td><el-input v-model="form.name"></el-input></td>
                            </tr>
                            <tr>
                                <tds-label star>网站地址：</tds-label>
                                <td><el-input v-model="form.link"></el-input></td>
                            </tr>
                            <tr>
                                <tds-label>用户邮箱：</tds-label>
                                <td><el-input v-model="form.email"></el-input></td>
                            </tr>
                            <tr>
                                <tds-label>服务类型：</tds-label>
                                <td>
                                    <el-radio v-model="form.type" label="0">首页链接</el-radio>
                                    <el-radio v-model="form.type" label="1">全站链接</el-radio>
                                    <el-radio v-model="form.type" label="0">服务结束</el-radio>
                                </td>
                            </tr>
                            <tr>
                                <tds-label>服务状态：</tds-label>
                                <td>
                                    <el-radio v-model="form.status" label="0">关闭</el-radio>
                                    <el-radio v-model="form.status" label="1">开启</el-radio>
                                </td>
                            </tr>
                            <tr>
                                <tds-label star>开始时间：</tds-label>
                                <td>
                              
                                    <el-date-picker
                                      v-model="form.starttime"
                                      type="date"
                                      placeholder="选择日期"
                                      :picker-options="state.pickerOptions"
                                      value-format="default-time">
                                    </el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <tds-label star>结束时间：</tds-label>
                                <td>
                                    <el-date-picker
                                      v-model="form.endtime"
                                      type="date"
                                      placeholder="选择日期"
                                      :picker-options="state.pickerOptions"
                                      value-format="default-time">
                                    </el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <tds-label>链接价格：</tds-label>
                                <td><el-input v-model="form.price"></el-input></td>
                            </tr>
                            <tr>
                                <tds-label class=" position-r">
                                    <div class="position-a top-0 right-0">备注说明：</div>
                                </tds-label>
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
    import { mapState,mapActions } from 'vuex'
    export default {
        data: function(){
            return {
                dialogVisible:false,
                submit:0,
                typeVal:0,
                statusVal:0,
                btnSubmit:0,
                linkTitle:'新增友情链接',
                list:'',
                selected: [],
                random:'',
                google:"t-10002",
                init:{
                    type:'',
                    starttime:'2020-07-15T16:00:00.000Z',
                    endtime:'',
                    link:'',
                    status:'',
                    pagesize:10,
                    page:0,
                    total:0,
                    currentPage1:1,
                },
                form:{
                    id:0,
                    name:'',
                    link:'',
                    email:'',
                    type:0,
                    status:0,
                    starttime:'',
                    endtime:'',
                    price:'',
                    text:'',
                },
                params:{
                    type:'',
                    status:'',
                }
            }
        },
        watch: {  
            'random': 'dataList',
            'init.title': 'dataList',
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
        created: function() {
            this.dataList();
        },
        methods: {
            ...mapActions(['remove']),
            dataList(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                    "type":this.init.type,
                    "link":this.init.link,
                    "starttime":this.init.starttime,
                    "endtime":this.init.endtime,
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
                this.form={...item}
            },
            openLink(){
                this.dialogVisible=true;
                this.btnSubmit=0;
                this.linkTitle="新增友情链接";
                this.form={
                        id:0,
                        name:'',
                        link:'',
                        email:'',
                        type:'0',
                        status:'1',
                        starttime:'',
                        endtime:'',
                        price:'',
                        text:'',
                };
            },
            Submit(operating){
                const data={
                    "google":this.google,
                    "operating":operating,
                    "form":this.form
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    if(res.data.retType=='success'){
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
                        if(res.status==200){
                            this.dataList(); 
                        }       
                    })
                })
            },
        },
    }
</script>