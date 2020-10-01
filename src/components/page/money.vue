<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <breadBar :list="['网站收支账单明细清单']"></breadBar>
        <div class="layout background-white margin-left-0 border-default padding-10 background-eee clearfix" style="border-bottom:0px;">
            <div class="float-left"  style="color:#008000">
                <span class="color-default">收入：</span>
                <img src="static/images/money-bag.png" alt="" class="width-20">
                +{{init.income}}
            </div>
            <div class="float-left margin-left-20" style="color:#008000">
                <span class="color-default">未结算：</span>
                <img src="static/images/money-bag.png" alt="" class="width-20">
                +{{init.Unsettlement}}
            </div>
            <div class="float-left margin-left-20" style="color:#ff6600">
                <span class="color-default">支出：</span>
                <img src="static/images/money-bag.png" alt="" class="width-20">
                -{{init.paycount}}
            </div>
            

            
            <template v-if="state.authority==2">
                <div class="button button-primary button-md margin-left-20 float-right font-size-14" data-popover="modal-animate" data-target="#model1" @click="openLink()">
            <i class="button-ico fa fa-plus-square"></i>账单录入</div>
            </template>
        </div>

        <div class="layout margin-left-0 margin-right-0">
            <div class="table-data" style="margin:0px">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-50 align-center">序号</th>
                            <th>交易说明</th>
                            <th>交易用户</th>
                            <th>金额</th>
                            <th>收支类型</th>
                            <th>交易方式</th>
                            <th>结算状态</th>
                            <th v-if="state.authority==2">备注</th>
                            <th>交易时间</th>
                            <th v-if="state.authority==2">操作</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-eee':item.status==0}">
                                <td class="color-default" style="background: #f6f6f6;">
                                    <span v-if="init.page==0">{{init.total-index}}</span>
                                    <span v-else>{{init.total-(init.page*init.pagesize+index)}}</span>
                                </td>
                                <td>{{item.title}}</td>
                                <td>{{item.user}}</td>
                                
                                
                                <td>
                                    <!-- <img src="static/images/money-bag.png" alt="" class="width-20"> -->
                                    <span v-if="item.type==0" style="color:#008000">+{{item.price}}</span>
                                    <span v-if="item.type==1" style="color:#ff6600">-{{item.price}}</span>
                                </td>
                                
                                
                                <td>
                                    <span v-if="item.type==1" style="color:#ff6600">支出</span>
                                    <span v-if="item.type==0" style="color:#008000">收入</span>
                                </td>
                                <td>
                                    <span v-if="item.pay==0">支付宝</span>
                                    <span v-if="item.pay==1">微信</span>
                                    <span v-if="item.pay==2">未交易</span>
                                </td>
                                <td>
                                    <span class="background-one color-white padding-5 font-size-12 radius-3" v-if="item.status==1">已结算</span>
                                    <span class="background-two color-white padding-5 font-size-12 radius-3" v-if="item.status==0">未结算</span>
                                </td>
                                <!-- <td><Status :item='item'></Status></td> -->
                                <td v-if="state.authority==2">{{item.text}}</td>
                                <td>{{item.endtime}}</td>
                                <!-- <td>{{item.endtime,'YYYY-MM-DD' | moment}}</td> -->
                                <td v-if="state.authority==2">
                                    <a class="a-link pointer" data-popover="modal-animate" data-target="#model1" @click="select(item)">编辑</a>
                                 
                                    <!-- <a class="a-link pointer" @click="remove(item)">删除</a> -->
                                </td>
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
              :current-page="init.currentPage1"
              :page-sizes="[10,15,20,25]"
              :page-size="parseInt(init.pagesize)"
              layout="total, sizes, prev, pager, next, jumper"
              :total="parseInt(init.total)">
            </el-pagination>
        </div>

        <!-- 模态框 -->
        <div id="model1" class="popover-modal popover-animate layout" data-modal="zx-animate">
          <div class="popover-modal-header">
            <div class="title">{{linkTitle}}</div>
            <div class="close" data-close="modal-animate"></div>
          </div>

          <div class="popover-modal-body">
                <div class="table-default" style="margin:0px">
                        <table class="table-group line-height-30 width-max" style="box-shadow:0px 0px 1px #eee;">
                            
                            
                            <tr class="height-50">
                                <td class="width-100 align-right"><span class="color-star">交易说明：</span></td>
                                <td><input type="text" maxlength="200" class="input-default input-h34 width-max" value="100素材网" v-model="form.title"></td>
                            </tr>
                            <tr class="height-50">
                                <td class="width-100 align-right"><span class="color-star">交易用户：</span></td>
                                <td><input type="text" maxlength="200" class="input-default input-h34 width-max" value="100素材网" v-model="form.user"></td>
                            </tr>
                            <tr class="height-50">
                                <td class="width-100 align-right"><span class="color-star">金额：</span></td>
                                <td><input type="number" maxlength="20" class="input-default input-h34 width-max" value="100素材网" v-model="form.price"></td>
                            </tr>
                            
                            <tr class="height-50">
                                <td class="align-right">收支类型：</td>
                                <td>
                                    <radioStatus :radioId="'type'" :list="['收入','支出']" :val='form.type' @radio="radioType"></radioStatus>
                                </td>
                            </tr>
                            <tr class="height-50">
                                <td class="align-right">是否结算：</td>
                                <td>
                                    <radioStatus :radioId="'status'" :list="['未结算','已结算']" :val='form.status' @radio="radioStatus"></radioStatus>
                                </td>
                            </tr>
                            <tr class="height-50" v-if="form.status==1">
                                <td class="align-right">交易方式：</td>
                                <td>

                                    <radioStatus :radioId="'pay'" :list="['支付宝','微信']" :val='form.pay' @radio="radioPay"></radioStatus>
                                </td>
                            </tr>
                            
                            <tr class="height-50">
                                <td class="align-right"><span class="color-star">交易时间：</span></td>
                                <td><input type="text" maxlength="20" class="input-default input-h34 width-max" value="100素材网" v-model="form.endtime"></td>
                                <!-- <td>
                                                              
                                    <el-date-picker
                                      v-model="form.endtime"
                                      type="date"
                                      placeholder="选择日期"
                                      value-format="default-time">
                                    </el-date-picker>
                                </td> -->
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
            <div class="button button-primary button-sm" v-if="btnSubmit==0" @click="Submit('insert')">确定</div>
            <div class="button button-primary button-sm" v-else @click="Submit('update')">确定</div>
            
          </div>
        </div>
        <!-- 模态框 -->
        <editAll :google="google" :selected="selected" :random="Math.round(Math.random()*10000)" @getBack="status"></editAll>
</div>
</template>

<script>
    import breadBar from '../common/breadBar'
    import Tag from '../common/tag'
    import radioStatus from '../common/radioStatus'
    import Status from '../common/status'
    import editAll from '../common/editAll'
    import { mapState } from 'vuex'
    export default {
        components: {
            breadBar,Tag,radioStatus,Status,editAll
        },
        data: function(){
            return {
                randomVal:'',
                submit:0,
                typeVal:0,
                statusVal:0,
                btnSubmit:0,
                linkTitle:'新增账单',
                list:'',
                selected: [],
                result:'',
                google:"t-20007",
                init:{
                    status:'',
                    pagesize:10,
                    page:0,
                    total:0,
                    currentPage1:1,
                    income:0,
                    paycount:0,
                    Unsettlement:0,
                },
                form:{
                    id:0,
                    title:'',
                    user:'',
                    price:'',
                    type:0,
                    pay:2,
                    text:'',
                    status:0,
                    endtime:'',
                },
            }
        },
        watch: {  
            'randomVal': 'dataList',
            'form.status':function(val,val2){
                if(val==0){
                    this.form.pay=2;
                }else{
                    this.form.pay=0;
                }
            },
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
        mounted: function() {
            this.$route.query.type=="all"?this.init.type='':this.init.type=this.$route.query.type;
            this.$route.query.status=="all"?this.init.status='':this.init.status=this.$route.query.status;
            this.dataList();
            localStorage.getItem("paramsStatus")
            localStorage.getItem("paramsStatus")
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
                    this.init.income=res.data.income;
                    this.init.paycount=res.data.paycount;
                    this.init.Unsettlement=res.data.Unsettlement;
                });
            },
            select(item){
                this.result="";
                this.btnSubmit=1;
                this.linkTitle="编辑账单";
                let data={
                    "google":item.coding,
                    "operating":"select",
                    "id":item.id,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                       this.form=res.data.data;
                    });
            },
            openLink(){
                this.result="";
                this.btnSubmit=0;
                this.linkTitle="新增账单";
                this.form={
                        id:0,
                        title:'',
                        user:'',
                        price:'',
                        type:0,
                        pay:2,
                        text:'',
                        status:0,
                        endtime:'',
                };
            },
            Submit(operating){
                let data={
                    "google":this.google,
                    "operating":operating,
                    "form":this.form
                }
                console.log(data)
                this.$axios.post(global.APIPATH,data).then(res => {    
                    this.result=res.data.result;
                    this.dataList();
                });
            },
            //数据状态
            status(item){
                this.randomVal=item;
            },
            //删除数据
            remove(item){
                let _this=this;
                model("info","是否确认删除文件?");
                $("#info").find("[data-go='yes']").click(function(){
                    let data={
                        "google":item.coding,
                        "operating":"delete",
                        "id":item.id,
                    }
                  
                    _this.$axios.post(global.APIPATH,data).then(res => {
                            model("loading",res.data.result); 
                            _this.dataList();                         
                        });
                })
            },
            
            radioStatus(item){
                this.form.status=item;
            },
            radioType(item){
                this.form.type=item;
            },
            radioPay(item){
                this.form.pay=item;
            },
     
        },
    }
</script>