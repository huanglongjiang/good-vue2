<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.slider" />
        <good-box data="true">
        <good-tag tagName="服务类型" :list="constant.filter.slider.type" :selected.sync='init.type' />
        <good-tag tagName="服务状态" :list="constant.filter.slider.status" :selected.sync='init.status' />
        </good-box>
        <good-menu>
            <good-search class="float-left margin-right-10" v-model="init.title"></good-search>
            <good-statusall :google="google" :selected="selected" :random.sync='random'></good-statusall>
            <good-button class='float-right' icon="el-icon-edit" type="primary" @click="openSlider">新增轮播图</good-button>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>
        
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-100;">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th>
                            <th class="width-100;">图片</th>
                            <th style="min-width:50px;width:300px;">标题</th>
                            <th class="width-150;">类型</th>
                            <th class="width-100;">状态</th>
                            <th class="width-100;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr class="width-80" :class="{'background-disabled':item.status==0}">
                                <td>
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else="selected.includes(item.id)">选择</template>
                                    </good-checkbox>
                                </td>
                                <td>
                                    <div class="line-height-30 padding-3">
                                        <img class="width-auto height-60 block" :src="'good/'+item.file" v-if="item.file!=''">
                                        <img class="width-auto height-60 block" src="static/images/tianmao.jpg" alt="" v-else>
                                    </div>
                                    
                                </td>
                                <td><span>{{item.title}}</span></td>
                                <td>
                                    <good-label background="background-one" v-if="item.type==0">通用轮播图</good-label>
                                    <good-label background="background-danger" v-if="item.type==1">首页轮播图</good-label>
                                    <good-label background="background-success" v-if="item.type==2">栏目页轮播图</good-label>
                                    <good-label background="background-one" v-if="item.type==3">内容页轮播图</good-label>
                                </td>
                                <td><good-switch :val.sync='item' :aaa.sync='statusVal2' :key="index"></good-switch></td>
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
          <good-dialog :title="sliderTitle" :visible.sync='dialogVisible'>
            <div slot="body">
            <div class="table-default">
                <table class="table-group line-height-30 width-max">
                    <tr>
                        <tds-label star>图片标题：</tds-label>
                        <td><el-input v-model="form.title" placeholder="请输入内容"></el-input></td>
                    </tr>

                    <tr>
                        <tds-label>链接地址：</tds-label>
                        <td><el-input v-model="form.url" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                       <tds-label>图片类型：</tds-label>
                       <td>
                            <el-radio v-model="form.type" label="0">通用轮播图</el-radio>
                            <el-radio v-model="form.type" label="1">首页轮播图</el-radio>
                            <el-radio v-model="form.type" label="2">栏目页轮播图</el-radio>
                            <el-radio v-model="form.type" label="3">内容页轮播图</el-radio>
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
                        <tds-label>图片路径：</tds-label>
                        <td>
                        <good-upload id="u3" type="slider" :data.sync='form'></good-upload>
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

        <good-dialog title="信息详情" :visible.sync='dialogVisible2'>
            <div slot="body">
            <div class="table-default">
                <table class="table-group line-height-30 width-max">
                    <tr>
                        <tds-label>图片标题：</tds-label>
                        <td>{{form.title}}</td>
                    </tr>

                    <tr>
                        <tds-label>链接地址：</tds-label>
                        <td>{{form.url}}</td>
                    </tr>
                    <tr>
                       <tds-label>图片类型：</tds-label>
                       <td>

                            <template v-if="form.type==0">通用轮播图</template>
                            <template v-if="form.type==1">首页轮播图</template>
                            <template v-if="form.type==2">栏目页轮播图</template>
                            <template v-if="form.type==3">内容页轮播图</template>
                       </td>
                    </tr>
                    <tr>
                       <tds-label>服务状态：</tds-label>
                       <td>
                            <template v-if="form.status==0">关闭</template>
                            <template v-if="form.status==1">开启</template>
                       </td>
                    </tr>
                    <tr>
                        <tds-label>图片路径：</tds-label>
                        <td>
                            <img class="width-auto height-100 block" :src="'good/'+form.file" v-if="form.file!=''">
                            <img class="block height-100" src="static/images/tianmao.jpg" alt="" v-else>
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
                statusVal2:true,
                list:'',
                selected: [],
                random:'',
                google:"t-10007",
                btnSubmit:0,
                sliderTitle:'新增轮播图',
                init:{
                    title:'',
                    type:'',
                    status:'',
                    pagesize:10,
                    page:0,
                    total:0,
                    currentPage1:1,
                },
                form:{
                    id:0,
                    type:0,
                    title:'',
                    image:'',
                    file:'',
                    url:'',
                    status:0,
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
        },
        methods: {
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
                this.sliderTitle="新增轮播图";
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
                this.sliderTitle="编辑轮播图";
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
