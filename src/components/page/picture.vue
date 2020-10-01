<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <breadBar :list="['图集中心']"></breadBar>
        <Tag type="type" tagName="栏目" :list="listTitle" :json="true" @getBack="tabTitle"></Tag>
        <Tag type="status" tagName="服务状态" :list="['关闭','开启']" :json="false" @getBack="tabStatus"></Tag>
        <div class="layout background-white border-default padding-10 background-eee"style="border-bottom:0px;">
            <div class="float-left">
                <div class="search-group">
                      <input type="text" class="input-default float-left border-right width-200" placeholder="请输入图片名称..." v-model="init.title">
                      <div class="search-button-ico float-left fa fa-search" @click="dataList()"></div>
                </div>
            </div>

            <div class="button button-primary button-md margin-left-20 float-right font-size-14" data-popover="modal-animate" data-target="#model1" @click="openPicture()">
            <i class="button-ico fa fa-plus-square"></i>新增产品</div>
            <div class="clear"></div>
        </div>
        <div class="layout">
            <div class="table-data" style="margin:0px">
                <table class="table-group line-height-30">
                    <thead class="block-header">


                    <thead class="block-header">
                        <tr>
                            <th style="width:50px;">
                                <label for="checkboxAll">
                                    <i class="fa fa-check-square color-primary pointer" v-if="selectAll"></i>
                                    <i class="fa fa-square-o pointer color-default" v-if="!selectAll"></i>
                                    <input type="checkbox" id="checkboxAll" class="none" v-model="selectAll">
                                </label>
                            </th>
                            <th>图片名称</th>
                            <th>类型</th>
                            <th>图片</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-eee':item.status==0}">
                                <td>
                                    <label :for="'checkbox'+index">
                                        <i class="fa fa-check-square color-primary pointer" v-if="selected.indexOf(item.id)>-1"></i>
                                        <i class="fa fa-square-o pointer color-default" v-else></i>
                                        <input type="checkbox" :id="'checkbox'+index" class="none" v-model="selected" :value="item.id" number>
                                    </label>
                                </td>
                                
                                <td><div class="width-max break">{{item.title}}</div></td>
                                <td>
                                    <template v-for="item in item.parentName">
                                        <span class="padding-2 padding-left-5 padding-right-5 margin-left-10 color-333 pointer">{{item}}</span>
                                    </template>
                                </td>
                                <td>
                                    <img :src="state.Imgpath+'picture/'+item.image" alt="" class="width-120 height-auto" v-if="item.image!=''">
                                </td>
                                <td><Status :item='item'></Status></td>
                                <td>
                                    <template v-if="state.account==item.author">
                                        <a class="a-link pointer" data-popover="modal-animate" data-target="#model1" @click="select(item)">编辑</a>
                                        <a class="a-link pointer" @click="remove(item)">删除</a>
                                    </template>
                                    <template v-else>
                                        <a class="color-ccc">编辑</a>
                                        <a class="color-ccc">删除</a>
                                    </template>
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
        <div class="title">{{pictureTitle}}</div>
        <div class="close" data-close="modal-animate"></div>
      </div>

      <div class="popover-modal-body">
        <div class="table-default" style="margin:0px">
            <table class="table-group line-height-30 width-max">
                
                
                
                <tr class="height-50">
                    <td class="align-right width-120"><span class="color-star">图片名称：</span></td>
                    <td><input type="text" maxlength="50" class="input-default input-h34 width-max" value="横幅" v-model="form.title"></td>
                </tr>
                <tr class="height-50">
                    <td class="align-right position-r">
                        <div  class="position-a top-8 right-0"><span class="color-star">图片类型：</span></div>
                        
                    </td>
                    <td>
                        <div class="clearfix padding-5" style="border:1px solid #ccc">
                            <template v-for="(item,index) in listTitle">
                                <div class="line-height-30 float-left margin-left-10 font-size-14 pointer" @click="check(item)">
                                
                                    <template  v-if="(form.parentNames).indexOf(item.name)>=0">
                                        <i class="font-size-14 fa fa-dot-circle-o a-primary"></i>
                                        <span class=" a-primary">{{item.name}}</span>
                                    </template>
                                    <template v-else>
                                        <i class="fa fa-circle-o font-size-14 a-ccc"></i>
                                        <span class=" a-ccc">{{item.name}}</span>
                                    </template>
                                 
                                </div>
                            </template>
                       
                        </div>

                    </td>
                </tr>
                <tr class="height-50">
                   <td class="align-right">服务状态：</td>
                   <td>
                       <radioStatus :radioId="'status'" :list="['关闭','开启']" :val='form.status' @radio="radioStatus"></radioStatus>

            
                   </td>
                </tr>
                
                <tr class="height-50">
                    <td class="align-right position-r">
                        <div class="position-a top-0 right-0"><span class="color-star">图片路径：</span></div>
                    
                    </td>
                    <td>
                        <Images type="picture" :form='form'></Images>
                        <UploadFile :total='300' :id="'u5'" @btnClick="imgName"></UploadFile>
                  
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
    import Images from '../common/image'
    import UploadFile from '../common/uploadFile'
    import { mapState } from 'vuex'
    export default {
        components: {
            breadBar,Tag,radioStatus,Status,editAll,Images,UploadFile
        },
        data: function(){
            return {
                randomVal:'',
                list:'',
                listTitle:'',
                selected: [],
                result:'',
                google:"t-10018",
                google2:"t-10016",
                titleVal:'',
                statusVal:'',
                btnSubmit:0,
                pictureTitle:'新增产品',
                rows:0,
                init:{
                    fid:'',
                    title:'',
                    type:'',
                    pagesize:10,
                    page:0,
                },
                form:{
                    id:0,
                    parentId:[],
                    parentNames:[],
                    type:0,
                    title:'',
                    image:'',
                    url:'',
                    status:0,
                },
                currentPage1: 1,
                
            }
        },
        watch: {  
            'randomVal': 'dataList',
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
            this.$route.query.type=="all"?this.init.fid='':this.init.fid=this.$route.query.type;
            this.$route.query.status=="all"?this.init.status='':this.init.status=this.$route.query.status;

            this.dataList();
            this.submitFormTitle();
        },
        methods: {
            check(item){
            
                var bool=$.inArray(item.name,this.form.parentNames);
                if(bool==-1){
                    if(this.form.parentNames.length<3){
                        this.form.parentId.push(item.id);
                        this.form.parentNames.push(item.name);
                    }
                }else{
                    for(var i=0; i<this.form.parentNames.length; i++) {
                        if(this.form.parentNames[i] == item.name) {
                            this.form.parentId.splice(i,1);
                            this.form.parentNames.splice(i,1);
                            break;
                        }
                    }
                }
                
            },
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
                    "fid":this.init.fid,
                    "title":this.init.title,
                    "type":this.init.type,
                    "status":this.init.status,
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                 
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.rows=res.data.rows;
                });
            },
            submitFormTitle(){
                let data={
                    "google":this.google2,
                    "operating":"lists",
                    "type":1,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.listTitle=res.data.data;
                    this.$nextTick(function(){
                        var type=this.$route.query.type=="all"?0:parseInt(this.$route.query.type);
                        if(type!=undefined){
                          $(function(){
                            if(type==0){
                                $(".tag-group-type a").each(function(){
                                    $(".tag-group-type a").removeClass("tag-primary").eq(type).addClass("tag-primary");
                                })
                            }else{
                                $(".tag-group-type a").each(function(){
                                    var dataId=$(this).data("id");
                                    $(".tag-group-type a").removeClass("tag-primary");
                                    if(parseInt(dataId)==parseInt(type))
                                    {
                                      $(this).addClass("tag-primary");
                                      return false;
                                    }
                                })
                            }
                            
                          })
                        }
                    })
                });
            },
            openPicture(){
                this.result="";
                this.btnSubmit=0;
                this.AdsenseTitle="新增产品";
                this.form={
                        id:0,
                        parentId:[],
                        parentNames:[],
                        type:0,
                        title:'',
                        image:'',
                        url:'',
                        status:0,
                };
            },
            select(item){
                this.result="";
                this.btnSubmit=1;
                this.pictureTitle="编辑产品";
                let data={
                    "google":item.coding,
                    "operating":"select",
                    "id":item.id,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                       this.form=res.data.data;
                    });
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
            tabTitle(val){
                this.currentPage1=1;
                this.init.fid=val.id;
                this.dataList();
            },
            tabStatus(val){
                this.currentPage1=1;
                this.init.status=val;
                this.dataList();
            },
            radioStatus(item){
                this.form.status=item;
            },
            imgName(item){
              this.form.image=item;
            }
        },

    }
</script>
