<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <div class="layout margin-10">
            <ol class="breadbar">
              <li><a>后台管理平台</a></li>
              <li class="active">文件库</li>
            </ol>
            <div class="clear"></div>
        </div>

        <div class="layout background-white border-default padding-10 background-eee" style="border-bottom:0px;">
            <div class="float-left">
                <div class="search-group">
                      <input type="text" class="input-default float-left border-right width-200" placeholder="请输入..." v-model="init.link">
                      <div class="search-button-ico float-left fa fa-search" @click="submitForm()"></div>
                </div>
            </div>
            <div class="button button-primary button-md margin-left-20 float-right font-size-14" data-popover="modal-animate" data-target="#model1" @click="add()">新建链接</div>
            <div class="clear"></div>
        </div>

        <div class="layout">
            <div class="table-data" style="margin:0px">
                <table class="table-group line-height-30" style="box-shadow:0px 0px 1px #eee;">
                    <thead class="block-header" style="color: #6E6E6E">
                        <tr>
                            <th>类型</th>
                            <th>服务状态</th>
                            <th>网站名称</th>
                            <th>网址</th>
                            <th>用户邮箱</th>
                            
                            <th>链接价格</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>操作</th>
                            
                        </tr>
                    </thead>
                    <tbody style="color: #6E6E6E">
                        <template v-for="(item,index) in list">
                            <tr>
                                <td>
                                    <span class="background-primary radius-3 padding-2 padding-left-5 padding-right-5 color-white" v-if="item.type==0">出售链接</span>

                                    <span class="background-info radius-3 padding-2 padding-left-5 padding-right-5 color-white" v-if="item.type==1">相互链接</span>

                                    <span class="background-danger radius-3 padding-2 padding-left-5 padding-right-5 color-white" v-if="item.type==2">100素材</span>

                                    <span class="background-warning radius-3 padding-2 padding-left-5 padding-right-5 color-white" v-if="item.type==3">服务结束</span>
                                </td>

                                <td>
                                    <span class="background-primary radius-3 padding-2 padding-left-5 padding-right-5 color-white" v-if="item.status==0">关闭</span>
                                    <span class="background-info radius-3 padding-2 padding-left-5 padding-right-5 color-white" v-if="item.status==1">开启</span>
                                </td>
                                <td>{{item.name}}</td>
                                <td><a href="http://www.100sucai.com/" class="a-link">{{item.link}}</a></td>
                                <td>{{item.email}}</td>
                                
                                <td>{{item.price}}</td>
                                <td>{{item.starttime}}</td>
                                <td>{{item.endtime}}</td>
                                <td>
                                    <a class="a-link pointer" data-popover="modal-animate" data-target="#model1" @click="edit(item.id)">编辑</a>
                                 
                                    <a class="a-link pointer" @click="del(item.id)">删除</a>
                                </td>
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>
        </div>
        <div class="layout float-right margin-top-10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage1"
              :page-sizes="[10,15,20,25]"
              :page-size="init.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="rows">
            </el-pagination>
        </div>

        <!-- 模态框 -->
        <div id="model1" class="popover-modal popover-animate layout" data-modal="zx-animate">
  <div class="popover-modal-header">
    <div class="title" style="font-size:18px; color:#c9302c">{{form.name}}</div>
    <div class="close" data-close="modal-animate"></div>
  </div>

  <div class="popover-modal-body">
<div class="table-default" style="margin:0px">
                <table class="table-group line-height-30 width-max" style="box-shadow:0px 0px 1px #eee;">
                    
                    
                    <tr class="height-50">
                        <td class="width-100 align-right"><span class="color-star">网站名称：</span></td>
                        <td><input type="text" class="input-default input-h34 width-max" value="100素材网" v-model="form.name"></td>
                    </tr>
                    <tr class="height-50">
                        <td class="align-right"><span class="color-star">网站地址：</span></td>
                        <td><input type="text" class="input-default input-h34 width-max" value="http://www.100sucai.com/" v-model="form.link"></td>
                    </tr>
                    <tr class="height-50">
                        <td class="align-right"><span class="color-star">用户邮箱：</span></td>
                        <td><input type="text" class="input-default input-h34 width-max" value="http://www.100sucai.com/" v-model="form.email"></td>
                    </tr>
                    <tr class="height-50">
                        <td class="align-right"><span class="color-star">服务类型：</span></td>
                        <td>
                            <template v-for="(item,index) in ['出售链接','相互链接','100素材','服务结束']">
                                <label :for="'id'+index">
                                    <input type="radio" :id="'id'+index" name="radio" v-if="index==form.type" checked="checked" :value="index" v-model="form.type">
                                    <input type="radio" :id="'id'+index" name="radio" v-if="index!=form.type"  :value="index" v-model="form.type">
                                    <span class="margin-right-20">{{item}}</span>
                                </label>
                            </template>
                        </td>
                    </tr>
                    <tr class="height-50">
                        <td class="align-right">服务状态：</td>
                        <td>
                            <template v-for="(item,index) in ['关闭','开启']">
                                <label :for="'id-'+index">
                                    <input type="radio" :id="'id-'+index" name="radio2" v-if="index==form.status" checked="checked" :value="index"v-model="form.status">
                                    <input type="radio" :id="'id-'+index" name="radio2" v-if="index!=form.status" :value="index" v-model="form.status">
                                    <span class="margin-right-20">{{item}}</span>
                                </label>
                            </template>
                        </td>
                    </tr>
                    <tr class="height-50">
                        <td class="align-right">开始时间：</td>
                        <td>
                            <input type="text" class="input-default" v-model="form.starttime">
                            <!-- <el-date-picker
                              v-model="form.starttime"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="timestamp">
                            </el-date-picker> -->
                        </td>
                    </tr>
                    <tr class="height-50">
                        <td class="align-right">结束时间：</td>

                        <td>
                            <input type="text" class="input-default" v-model="form.endtime">
                            <!-- <el-date-picker
                              v-model="form.endtime"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="timestamp">
                            </el-date-picker> -->
                        </td>
                    </tr>
                    <tr class="height-50">
                        <td class="align-right">价格：</td>
                        <td><input type="text" class="input-default input-h34 width-max" v-model="form.price"></td>
                    </tr>
                    <tr class="height-50">
                        <td class="align-right position-r"><div class="position-a top-8 right-0">备注：</div></td>
                        <td>
                            <textarea maxlength="100" class="input-default height-80 line-height-20 width-max padding-5" v-model="form.text"></textarea>
                        </td>
                    </tr>
                </table> 
            </div>
  </div>
  <div class="popover-modal-footer position-a" style="bottom: 0px; right: 0px; text-align: right;">
    <div class="float-left color-red padding-left-20">{{result}}</div>
    <div class="button button-primary button-sm" @click="sub()">确定</div>
    <div class="button button-primary button-sm" @click="sub2()">确定2</div>
    
  </div>
</div>
        <!-- 模态框 -->
</div>
</template>

<script>
    export default {
        data: function(){
            return {
                tabVal:0,
                list:'',
                result:'',
                
                init:{
                    type:'0',
                    starttime:'',
                    endtime:'',
                    link:'',
                    pagesize:'10',
                    page:'0',
                },
                rows:'0',
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
                currentPage1: 1,
            }
        },
        mounted: function() {
            this.submitForm();
        },
        methods: {
            
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.init.pagesize=val;
                this.submitForm();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.init.page=val-1;
                this.submitForm();
            },

            submitForm(){
                let data={
                    "google":"t-10012",
                    "operating":10000,
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.rows=res.data.rows;
                }, response => {
                    res.log("error");
                });
            },
            edit(id){
                let data={
                    "google":"t-10002",
                    "operating":10001,
                    "id":id,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                       this.form=res.data.data;
                    }, response => {
                        res.log("error");
                    });
            },
            add(){
                this.form={
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
                };
            },
            sub(){
                let data={
                    "google":"t-10002",
                    "operating":10002,
                    "form":this.form
                }
                this.$axios.post(global.APIPATH,data).then(res => {    
                    this.result=res.data.result;
                    this.submitForm();
                }, response => {
                    res.log("error");
                });
            },
            sub2(){
                let data={
                    "google":"t-10002",
                    "operating":10003,
                    "form":this.form
                }
                this.$axios.post(global.APIPATH,data).then(res => {   
                    this.result=res.data.result;
                    this.submitForm();
                }, response => {
                    res.log("error");
                });
            },
            del(id){
                let _this=this;
                model("info","是否确认删除文件?");
                $("#info").find("[data-go='yes']").click(function(){
                    let data={
                        "google":"t-10002",
                        "operating":10004,
                        "id":id,
                    }
                  
                    _this.$axios.post(global.APIPATH,data).then(res => {
                            console.log(res.data)
                            model("success",res.data.result); 
                            _this.submitForm();
                                                       
                        }, response => {
                            res.log("error");
                        });
                })
            },
            tab(val){
                this.currentPage1=1;
                this.init.type=val;
                this.tabVal=val;
                console.log(val)
                this.submitForm();
            }
     
        },
    }
</script>
<style>
   /* .table-data .table-group td{font-size: 12px;padding: 5px;}*/
</style>