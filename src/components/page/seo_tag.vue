<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <div class="layout margin-10">
            <ol class="breadbar">
              <li><a>{{state.headTitle}}</a></li>
              <li class="active">文章栏目设置</li>
            </ol>
            <div class="clear"></div>
        </div>
              <div class="layout background-white border-default padding-10 background-eee" style="border-bottom:0px;">
            <div class="float-left">
                <div class="search-group">
                      <input type="text" class="input-default float-left border-right width-200" placeholder="请输入栏目..." v-model="init.name">
                      <div class="search-button-ico float-left fa fa-search" @click="dataList()"></div>
                </div>
            </div>
            <div class="clear"></div>   
        </div>


        <div class="layout border-default background-eee" style="border-bottom:0px;">
            <div class="tag-group border-0">
                <span class="tag-type margin-left-10">标签：</span>
                
                <template v-for="(item,index) in listTitle">
                <span class="tag-block" style="margin-right:10px" v-if="item.type==2">
                    <span data-popover="modal-animate" data-target="#model1" @click="select(item,'编辑文章栏目')">{{item.name}}</span>
                    <span class="color-red" @click="remove(item,'t-10008')"><i class="fa fa-times font-size-12 margin-left-10"></i></span>
                    
                </span>
                
                </template>
                <a class="pointer color-999"data-popover="modal-animate" data-target="#model1" @click="openColumn(2,'新增文章栏目')"><i class="padding-right-5 fa fa-plus-square"></i>新增标签</a>
              
            </div>
           
        </div>    
  
         <!-- 模态框 -->
        <div id="model1" class="popover-modal popover-animate layout" data-modal="zx-animate">
  <div class="popover-modal-header">
    <div class="title">{{columnTitle}}</div>
    <div class="close" data-close="modal-animate"></div>
  </div>

  <div class="popover-modal-body">
<div class="table-default" style="margin:0px">
                <table class="table-group line-height-30 width-max" style="box-shadow:0px 0px 1px #eee;">
                    
                    
                    <tr class="height-50">
                        <td class="width-100 align-right"><span class="color-star">名称：</span></td>
                        <td><input type="text" maxlength="20" class="input-default input-h34 width-max" value="100素材网" v-model="form.name"></td>
                    </tr>
                    <tr class="height-50">
                        <td class="align-right position-r">
                            <div class="position-a top-0 right-0">缩 略 图：</div>
                            
                        </td>
                        <td>
                            <template v-if="form.image!=''">
                                <div class="border-3 padding-10 inline-block background-white width-140" style="border:2px dashed #ddd">
                                    <img :src="state.Imgpath+'article_title/'+form.image" alt="" class="width-120 height-auto block">
                                </div>
                            </template>
                            <template v-else>
                                <div class="border-3 padding-10 inline-block background-white width-140 height-auto" style="border:2px dashed #ddd">
                                    <img src="static/images/image.png" alt="" class="width-120 height-auto block">
                                </div>
                            </template>
                            <div class="layout margin-bottom-10 color-ccc"> 
                               注 ：图片上传后保存修改才能生效
                            </div>
                            <UploadFile :total='300' :id="'u7'" @btnClick="imgName"></UploadFile>
                      
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
</div>
</template>

<script>
    import UploadFile from '../common/uploadFile'
    import { mapState } from 'vuex'
    export default {
        components: {
            UploadFile
        },
        data: function(){
            return {
                btnSubmit:0,
                columnTitle:'新增栏目',
                listTitle:'',
                list:'',
                result:'',
                
                init:{
                    name:'',
                    pagesize:10,
                    page:0,
                },
                rows:0,
                form:{
                    id:0,
                    name:'',
                    image:'',
                    url:'',
                },
                currentPage1: 1,
            }
        },
        computed: {
            ...mapState(['state']),
        },
        mounted: function() {
            this.dataList();
        },
        methods: {
            
            
            dataList(){
                let data={
                    "google":"t-20005",
                    "operating":"lists",
                    "name":this.init.name,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.listTitle=res.data.data;
                });
            },
            select(item,title){
                this.result="";
                this.btnSubmit=1;
                this.columnTitle=title;
                let data={
                    "google":item.coding,
                    "operating":"select",
                    "id":item.id,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                       this.form=res.data.data;
                    });
            },
            openColumn(item,title){
                this.result="";
                this.btnSubmit=0;
                this.columnTitle=title;
                this.form={
                        type:item,
                        name:'',
                        image:'',
                        url:'',
                };
            },
       
            Submit(string){
                let data={
                    "google":"t-20005",
                    "operating":string,
                    "form":this.form
                }
                this.$axios.post(global.APIPATH,data).then(res => {  
                 
                    this.result=res.data.result;
                    this.dataList();
                });
            },
            //删除数据
            remove(item,table){
                let _this=this;
                model("info","是否确认删除文件?");
                $("#info").find("[data-go='yes']").click(function(){
                    let data={
                        "google":item.coding,
                        "operating":"delete",
                        "id":item.id,
                        "tab":table,
                        "label":'tag',
                    }
                  
                    _this.$axios.post(global.APIPATH,data).then(res => {
                            model("loading",res.data.result); 
                            _this.dataList();                         
                        });
                })
            },
            imgName(item){
              this.form.image=item;
            }

        },
    }
</script>
<style>
   /* .table-data .table-group td{font-size: 12px;padding: 5px;}*/
   .tag-group .tag-block{display: inline-table;}
</style>