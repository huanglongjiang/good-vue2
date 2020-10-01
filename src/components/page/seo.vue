<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <div class="layout margin-10">
            <ol class="breadbar">
              <li><a>{{state.headTitle}}</a></li>
              <li class="active">网站列表</li>
            </ol>
            <div class="clear"></div>
        </div>
        <div class="layout background-white margin-left-0 border-default padding-10 background-eee clearfix">
            <div class="button button-primary button-md margin-left-20 float-right font-size-14" data-popover="modal-animate" data-target="#model1" @click="openLink()">
            <i class="button-ico fa fa-plus-square"></i>新增域名</div>
        </div>
        <div class="layout">
            <div class="table-data" style="margin:0px">
                <table class="table-group line-height-30" style="border-left:0">
                    <thead class="block-header">
                        <tr>
                            <th>域名</th>
                            <th>爱站权重</th>
                            <th>chinaz权重</th>
                            <th>世界排名</th>
                            <th>注册时间</th>
                            <th>更新时间</th>
                            
                        </tr>
                    </thead>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                        <tr @mouseover="tabVal=index" @mouseleave="tabVal=-1">
                            <td>
                                <div class="position-r">{{item.domain}}
                                    <div class="table-data position-f left-200 top-60 z-index-100" style="margin:0px; width:800px;box-shadow:1px 1px 5px #ccc" v-if="tabVal==index">
                                        <table class="table-group line-height-30" style="border-left:0">
                                            <tr>
                                                <td class="align-center width-120" rowspan="2" style="background: #f7f7f7;">seo</td>
                                                <td>{{item.domain}}</td>
                                            </tr>
                                            <tr>
                                                <td><span v-html="item.aizhan_br"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="align-center" style="background: #f7f7f7;">ALEXA排名</td>
                                                <td>世界排名：{{item.alexa}}</td>
                                            </tr>
                                            <tr>
                                                <td class="align-center" style="background: #f7f7f7;">备案信息</td>
                                                <td>
                                                    备案号：{{item.icp_icp}}
                                                    性质：({{item.icp_type}})
                                                    名称：{{item.companyName}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="align-center" style="background: #f7f7f7;">域名信息</td>
                                                <td>审核时间：<span v-html="item.registrationTime"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="align-center" style="background: #f7f7f7;">服务器IP地址</td>
                                                <td>{{item.ip}}</td>
                                            </tr>
                                            <tr>
                                                <td class="align-center" style="background: #f7f7f7;">标题</td>
                                                <td>{{item.title}}</td>
                                            </tr>
                                            <tr>
                                                <td class="align-center" style="background: #f7f7f7;">关键字</td>
                                                <td>{{item.keywords}}</td>
                                            </tr>
                                            <tr>
                                                <td class="align-center" style="background: #f7f7f7;">描述</td>
                                                <td>{{item.description}}</td>
                                            </tr>
                                        </table> 
                                    </div>
                                </div>
                            </td>
                            <td><span v-html="item.aizhan_br"></span></td>
                            <td><span v-html="item.aizhan_br"></span></td>
                            <td>{{item.alexa}}</td>
                            <td><span v-html="item.registrationTime"></span></td>
                            <td>{{item.time}}</td>
                        </tr>
                       </template>
                    </tbody>
                </table> 
            </div>
        </div>
        <div class="layout align-right margin-top-10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage1"
              :page-sizes="[10,15,20,25]"
              :page-size="parseInt(init.pagesize)"
              layout="total, sizes, prev, pager, next, jumper"
              :total="parseInt(rows)">
            </el-pagination>
        </div>

        <!-- 模态框 -->
        <div id="model1" class="popover-modal popover-animate layout" data-modal="zx-animate">
          <div class="popover-modal-header">
            <div class="title">新增域名</div>
            <div class="close" data-close="modal-animate"></div>
          </div>

          <div class="popover-modal-body">
              <input type="text" class="input-default width-max" v-model="form.domain">
              <div class="clearfix padding-5 margin-top-10" style="border:1px solid #ccc">

                                <template v-for="(item,index) in listTag">
                                    <div class=" float-left margin-right-10 font-size-14 pointer line-height-30" @click="checkTag(item)">
                                        <template  v-if="(form.tagNames).indexOf(item.name)>=0">
                                            <i class="font-size-14 fa fa-check-square a-primary"></i>
                                            <span class=" a-primary">{{item.name}}</span>
                                        </template>
                                        <template v-else>
                                            <i class="fa fa-square-o font-size-14 a-ccc"></i>
                                            <span class=" a-ccc">{{item.name}}</span>
                                        </template>
                                        
                                     
                                    </div>
                                </template>

                            </div>
          </div>
          <div class="popover-modal-footer position-a" style="bottom: 0px; right: 0px; text-align: right;">
            <div class="float-left color-red padding-left-20">{{result}}</div>
            <div class="button button-primary button-sm" @click="Submit('insert')">确定</div>
            
          </div>
        </div>
        <!-- 模态框 -->
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data: function(){
            return {
                list:'',
                listTag:'',
                tabVal:-1,
                result:'',
                currentPage1: 1,
                rows:0,
                init:{
                    pagesize:10,
                    page:0  ,
                },
                form:{
                    domain:'www.baidu.com',
                    tagId:[],
                    tagNames:[],
                },
            }
        },
        computed: {
            ...mapState(['state']),
        },
        mounted: function() {
            this.dataList();
            this.submitFormTag();
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
                    "google":"t-20004",
                    "operating":"lists",
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.rows=res.data.rows;
                })
            },
            Submit(operating){
                let data={
                    "google":"t-20004",
                    "operating":operating,
                    "form":this.form
                }
                this.$axios.post(global.APIPATH,data).then(res => {    
                    this.result=res.data.result;
                    this.dataList();
                });
            },
            submitFormTag(){
                let data={
                    "google":"t-20005",
                    "operating":"lists",
                    "type":2,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
             
                    this.listTag=res.data.data;
                });
            },
            checkTag(item){
                var bool=$.inArray(item.name,this.form.tagNames);
                if(bool==-1){
                    //if(this.form.tagNames.length<3){
                    this.form.tagId.push(item.id);
                    this.form.tagNames.push(item.name);
                    //}
                }else{
                    for(var i=0; i<this.form.tagNames.length; i++) {
                        if(this.form.tagNames[i] == item.name) {
                            this.form.tagId.splice(i,1);
                            this.form.tagNames.splice(i,1);
                            break;
                        }
                    }
                }
                
            },
     
        },
    }
</script>
