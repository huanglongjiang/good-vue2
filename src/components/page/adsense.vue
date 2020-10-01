<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.adsense" />
        <good-box data="true">
        <good-tag tagName="服务状态" :list="constant.filter.adsense.status" :selected.sync='init.status' />
        </good-box>
        <good-menu>
            <good-search class="float-left margin-right-10" v-model="init.email"></good-search>
            <good-time v-model="init.starttime" text="日期"></good-time>
            <good-time v-model="init.endtime" text=" 至" class="margin-left-5"></good-time>
            <good-button class='float-left margin-left-20 margin-right-20' @click="dataList()">查询</good-button>
            <good-statusall :google="google" :selected="selected" :random.sync='random'></good-statusall>
            <good-button class='float-right' icon="el-icon-edit" type="primary" @click="openAdsense">新增广告位</good-button>
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
                            <th>用户邮箱</th>
                            <th>广告名称</th>
                            <th>投放位置</th>
                            <th>广告价格</th>
                            <th>广告尺寸</th>
                            <th>代码标签</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>投放状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}">
                                <td>
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else="selected.includes(item.id)">选择</template>
                                    </good-checkbox>
                                </td>
                                <td><span class="textline a-link">{{item.email}}</span></td>
                                <td><span class="textline a-link">{{item.name}}</span></td>
                                <td>{{item.position}}</td>
                                <td>{{item.price}}</td>
                                <td>{{item.size}}</td>
                                <td>{$adsense.{{item.id}}}</td>
                                <td>{{item.starttime,'YYYY-MM-DD' | moment}}</td>
                                <td>{{item.endtime,'YYYY-MM-DD' | moment}}</td>

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

        <good-dialog :title="AdsenseTitle" :visible.sync='dialogShow'>
          <div slot="body">
            <div class="table-default">
                <table class="table-group">
                    <tr>
                        <tds-label star>用户邮箱</tds-label>
                        <td><el-input v-model="form.email" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label star>广告名称</tds-label>
                        <td><el-input v-model="form.name" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label>投放位置</tds-label>
                        <td><el-input v-model="form.position" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label>广告价格</tds-label>
                        <td><el-input v-model="form.price" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label>广告尺寸</tds-label>
                        <td><el-input v-model="form.size" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label>代码标签</tds-label>
                        <td><el-input v-model="form.id" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                            <tds-label>服务状态</tds-label>
                            <td>
                                <el-radio v-model="form.status" label="0">关闭</el-radio>
                                <el-radio v-model="form.status" label="1">开启</el-radio>
                            </td>
                        </tr>
                    <tr>
                            <tds-label star>开始时间</tds-label>
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
                            <tds-label star>结束时间</tds-label>
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
                                <tds-label>广告图片</tds-label>
                                <td>
                                    <good-upload id="u4" type="adsense " :data.sync='form'></good-upload>
                                    <div class="color-ccc font-size-12 margin-bottom-10">图片地址{{state.Imgpath}}adsense/{{form.image}}</div>
                                </td>
                        </tr> 
                        <tr>
                            <tds-label>投放代码</tds-label>
                            <td>
                                <good-textarea v-model="form.code"></good-textarea>
                            </td>
                        </tr>
                        <tr>
                            <tds-label>备注说明</tds-label>
                            <td>
                                <good-textarea v-model="form.code"></good-textarea>
                            </td>
                        </tr> 
                </table> 
            </div>
            </div>
          <div slot="footer">
            <good-button @click="Submit('insert')" v-if="btnSubmit==0">确定</good-button>
            <good-button @click="Submit('update')" v-else>确定</good-button>  
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
                dialogShow:false,
                list:[],
                selected: [],
                random:'',
                google:"t-10003",
                statusVal:0,
                statusVal2:true,
                btnSubmit:0,
                AdsenseTitle:'新增广告位',
                init:{
                    type:0,
                    starttime:'',
                    endtime:'',
                    email:'',
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
                    size:'',
                    label:'',
                    email:'',
                    image:'',
                    type:0,
                    status:0,
                    starttime:'',
                    endtime:'',
                    price:'',
                    code:'',
                },
                params:{
                    status:'',
                },
                options: [{
                      value: '选项1',
                      label: '服务结束'
                    }, {
                      value: '选项2',
                      label: '服务中'
                    }]
            }
        },
        watch: {  
            'random': 'dataList',
            'init.email': 'dataList',
            'init.page': 'dataList',
            'init.pagesize': 'dataList',
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
            dataList(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                    "email":this.init.email,
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
                this.dialogShow=true;
                this.btnSubmit=1;
                this.AdsenseTitle="编辑广告位";
                this.form={...item}
            },
            openAdsense(){
                this.dialogShow=true;
                this.btnSubmit=0;
                this.AdsenseTitle="新增广告位";
                this.form={
                    
                    name:'',
                    link:'',
                    size:'',
                    label:'',
                    email:'',
                    image:'',
                    status:1,
                    starttime:'',
                    endtime:'',
                    price:'',
                    code:'',
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
        },

    }
</script>