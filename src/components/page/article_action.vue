<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.article" />
        <div class="layout padding-10" style="width:900px;">
            <div class="layout">
            <table class="table-group width-max">
                    <tr>
                        <td></td>
                        <td>
                            <template v-if="$route.query.type==2">
                                <good-button icon="fa-pencil" @click="Submit('update')">修改</good-button>
                            </template>
                            <template v-else>
                                <good-button icon="fa-pencil" @click="Submit('insert')">新增</good-button>
                            </template>
                            <router-link to="article?module=article&type=all&status=all" tag="a">
                                <good-button icon="fa-th-list">文章中心</good-button>
                            </router-link>
                        </td>
                    </tr>
                    <tbody>
                    <tr>
                        <tds-label star>文章标题：</tds-label>
                        <td><el-input v-model="form.title"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label>文章来源：</tds-label>
                        <td><el-input v-model="form.source"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label>自定义属性：</tds-label>
                        <td>
                            <el-radio v-model="form.type" label="0">默认</el-radio>
                            <el-radio v-model="form.type" label="1">优质</el-radio>
                            <el-radio v-model="form.type" label="2">热门</el-radio>
                            <el-radio v-model="form.type" label="3">推荐</el-radio>
                        </td>
                    </tr>
                    <tr>
                        <tds-label class=" position-r">
                            <div class="position-a top-0 right-0">文章栏目：</div>
                        </tds-label>
                        <td>
                            <good-box data="true">
                                <el-checkbox-group v-model="form.parentId">
                                    <template v-for="(item,index) in listTitle">
                                        <el-checkbox class="width-120" :label="item.id">{{item.name}}</el-checkbox>
                                    </template>
                                </el-checkbox-group>
                            </good-box>
                            <div class="layout margin-bottom-10 color-ccc margin-top-10 font-size-14"> 
                               注：最多可选择3个栏目
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <tds-label class="position-r">
                            <div class="position-a top-0 right-0">tag标签：</div>
                        </tds-label>
                        <td>
                            <good-box data="true">
                                <el-checkbox-group v-model="form.tagId">
                                    <template v-for="(item,index) in listTag">
                                        <el-checkbox class="width-120" :label="item.id">{{item.name}}</el-checkbox>
                                    </template>
                                </el-checkbox-group>

                            </good-box>
                            <div class="layout margin-bottom-10 color-ccc margin-top-10 font-size-14"> 
                               注：至少选择一个分类
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <tds-label class="position-r">
                            <div class="position-a top-0 right-0">缩 略 图：</div>
                        </tds-label>
                        <td>
                            <good-upload id="u6" type="article" :data.sync='form'></good-upload>
                        </td>
                    </tr>
                    <!-- <tr>
                        <tds-label>关键词：</tds-label>
                        <div class="layout padding-top-20">
                            <template v-for="(item,index) in colorKeywords">
                                <span class="tag-block padding-3 padding-left-5 padding-right-5 font-size-14" style="margin-right:10px; border:1px solid #ccc; background:#eee">
                                    <span@click="select(item,'编辑文章栏目')">{{item}}</span>
                                    <span class="margin-left-10 color-red pointer"><i class="fa fa-times font-size-12 " @click="removeKey(item)"></i></span>
                                </span>
                            </template>
                            <a class="pointer a-link" @click="openColumn2(item)"><i class="padding-right-5 fa fa-plus-square"></i>关键词库</a>
                            <div class="layout margin-bottom-10 color-ccc margin-top-15 font-size-14"> 
                               注：最多5个关键词
                            </div>
                        </div>
                        
                    </td>  
                    </tr> -->
                    <tr>
                        <tds-label class="position-r">
                            <div class="position-a top-0 right-0">内容简介：</div>
                        </tds-label>
                        <td><textarea maxlength="250" class="input-default height-120 width-max" v-model="form.description"></textarea></td>
                    </tr>
                    <tr>
                        <tds-label class="position-r">
                            <div class="position-a top-0 right-0">内容摘要：</div>
                        </tds-label>
                        <td>
                            <textarea id="textarea" name="content" class="width-max height-400" v-html="text"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-right"></td>
                        <td class="padding-top-20">
                            <template v-if="$route.query.type==2">
                                <good-button icon="fa-pencil" @click="Submit('update')">修改</good-button>
                            </template>
                            <template v-else>
                                <good-button icon="fa-pencil" @click="Submit('insert')">新增</good-button>
                            </template>
                            <router-link to="article?module=article&type=all&status=all" tag="a">
                            <good-button icon="fa-th-list">文章中心</good-button>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table> 
            </div>
        </div>   
        <!-- 模态框 -->
        <good-dialog title="关键词库" :visible.sync='dialogShow'>
          <div slot="body">
            <div class="tab-button-group">
                <div class="tab-link sm" :class="{'tab-active':tabVal==0}" @click="tabVal=0">关键词库列表</div>
                <div class="tab-link sm" :class="{'tab-active':tabVal==1}" @click="tabVal=1">自定义关键词</div>
                <div class="clear"></div>
            </div>
            <template v-if="tabVal==0">
            <div class="layout background-white border-default padding-10 background-eee margin-top-10" style="border-bottom:0px;">
                <div class="float-left">
                    <div class="search-group">
                          <input type="text" class="input-default float-left border-right width-200" placeholder="搜索关键词..." v-model="filterText">
                          <div class="search-button-ico float-left fa fa-search"></div>
                    </div>
                </div>
                <div class="clear"></div>   
            </div>

            <div class="layout align-center margin-top-10" style="border-bottom:0px;">
                   <!--  <template v-for="(item,index) in viewList">
                        <div class="layout margin-bottom-10 keys" style="display: inline-flex;"  @click="checkKeywords(item)">
                            

                            <template  v-if="colorKeywords.includes(item.name)">
                                <span class="pointer tag-block padding-3 padding-left-10 padding-right-10 font-size-14 radius-20  color-white background-primary border-1 border-primary" style="margin-right:10px;">
                               {{index+1}}、{{item.name}}
                            </span>
                            </template>
                            <template v-else>
                                <span class="pointer tag-block padding-3 padding-left-10 padding-right-10 font-size-14 radius-20  a-link textline" style="margin-right:10px; border:1px solid #ccc; background:#eee">
                               {{index+1}}、{{item.name}}
                            </span>
                            </template>
                        </div>
                     </template> -->
                </div>
            </template>
            <template v-else>
            <div class="layout background-white margin-top-30" style="border-bottom:0px;">
                
                <div class="table-default" style="margin:0px">
                    <table class="table-group line-height-30 width-max">
                        <tr>
                            <td class="width-100 align-right">自定义关键词：</td>
                            <td><input type="text" class="input-default width-max height-32" placeholder="手动添加关键词..." v-model="addkeywords"></td>
                        </tr>
                    </table>
                </div>
            </div>
            </template>
 
          </div>
            <div slot="footer">
                <good-button @click="addKey(addkeywords)">确定</good-button>
            </div>
        </good-dialog>


          <!-- <good-dialog :title="columnTitle" :visible.sync='dialogVisible2'>
            <div slot="body">
                <div class="table-default">
                            {{listKeywords}}
                    <good-key :data.sync="listKeywords" v-if="dialogVisible2"></good-key>
                </div>
            </div>
            <div slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="Submit('update')">确 定</el-button>
            </div>
        </good-dialog>  --> 
        <!-- 模态框 -->
</good-page>
</template>

<script>

import { mapState } from 'vuex'
var editor;

    export default {
        data: function(){
            return {
                dialogShow:false,
                dialogVisible2:true,
                tabVal:0,
                list:'',
                result:'',
                result2:'',
                google:"t-10008",
                google2:"t-10016",
                google3:"t-20001",
                google4:"t-10002",
                google5:"t-20006",
                listTitle:'',
                listKeywords:[],
                colorKeywords:[],
                filterText:"",
                keywords:'',
                addkeywords:'',
                listTag:'',
                text:"",
                type:1,
                form:{
                    fid:'0',
                    parentId:[],
                    parentNames:[],
                    tagId:[],
                    tagNames:[],
                    type:'0',
                    title:'',
                    image:'',
                    source:'原创',
                    keywords:'',
                    description:'',
                    text:'ssssssss',
                },
                
            }
        },
        computed: {
            ...mapState(['state']),
            // 搜索功能
            /*viewList(){
                this.result2="";
                let arr = [];
                this.listKeywords.forEach((item,index)=>{
                    if(this.filterText !== '' && item.name.includes(this.filterText)){
                        arr.push(item);
                    }else if(this.filterText === ''){
                        arr.push(item);
                    }
                });
                return arr;
            }*/
        },
        watch: { 
          'listKeywords':function(val){
            this.form.keywords=val.join(',')
          }
        },
        mounted: function() {
            
            this.submitFormTitle();
            this.submitFormTag();
            this.init();
            this.dataList();
        },
      
        methods: {
            openColumn2(item){
                this.dialogVisible2=true;
                this.form={...item};
                this.listKeywords=item.keywords==''?[]:this.listKeywords=item.keywords.split(',');

            },
            init(){
                if(this.$route.query.type==2){
                    this.submitForm();
                }else{
                    this.editor();
                }
            },
            dataList(){
                let data={
                    "google":this.google5,
                    "operating":"lists",
                    "name":this.keywords,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.listKeywords=res.data.data;
                });
            },
            checkTag(item){
                let has=this.form.tagNames.includes(item.name);
                if(!has){
                    this.form.tagId.push(item.id);
                    this.form.tagNames.push(item.name);
                   
                }else{

                    this.form.tagNames.forEach((item2,index)=>{
                        if(item.name === item2) {
                            this.form.tagId.splice(index,1);
                            this.form.tagNames.splice(index,1);
                        }
                    })  
                }
            },

            check(item){


                let has=this.form.parentNames.includes(item.name);
                if(!has){
                        if(this.form.parentNames.length<3){
                        this.form.parentId.push(item.id);
                        this.form.parentNames.push(item.name);
                    }
                   
                }else{
                    this.form.parentNames.forEach((item2,index)=>{
                        if(item.name === item2) {
                            this.form.parentId.splice(index,1);
                            this.form.parentNames.splice(index,1);
                        }
                    })  
                }                
            },
            checkKeywords(item){
                this.result2="";
                let has=this.colorKeywords.includes(item.name);
                if(!has){
                    if(this.colorKeywords.length<5){
                        this.colorKeywords.push(item.name);
                    }else{
                        this.result2="关键词最多只能有5个！";
                    }
                }else{
                    this.colorKeywords.forEach((item2,index)=>{
                        if(item.name === item2) {
                            this.colorKeywords.splice(index,1);
                        }
                    })
                }
                
            },
            removeKey(item){
                this.colorKeywords.forEach((item2,index)=>{
                    if(item === item2) {
                        this.colorKeywords.splice(index,1);
                    }
                })
                
            },
            addKey(item){
                this.result2="";
                if(item==""){
                    this.result2="自定义关键词不能为空值！";
                    return false;
                }
                let has=this.colorKeywords.includes(item);
                if(!has){
                    if(this.colorKeywords.length<5){
                        this.colorKeywords.push(item);
                        this.result2="已添加到临时数组中！";
                    }else{
                        this.result2="关键词最多只能有5个！";
                    }
                }else{
                    this.result2="关键词不能重复！";
                }
                
            },

            
            submitForm(){

                let data={
                    "google":this.google,
                    "operating":"select",
                    "id":this.$route.query.templateId,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                 
                    if(this.$route.query.type==2){
                        if(res.data.data!=null){
                            this.form=res.data.data;
                            if(this.form.keywords!=""){
                                this.colorKeywords=this.form.keywords.split(',');
                            }
                        }
                    }
     
                   this.text=this.form.text;
                   $("#textarea").text(this.form.text);
                   this.editor();
         
             
                });
            },
            editor(){
            
                //KindEditor.basePath = 'editor/';   //外网服务器
                KindEditor.basePath = 'static/editor/';  //vue本地服务器
                editor = KindEditor.create('textarea[name="content"]', {
                    allowFileManager : true
                });
            },
         
            submitFormTitle(){
                let data={
                    "google":this.google2,
                    "operating":"lists",
                    "type":2,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
             
                    this.listTitle=res.data.data;
                });
            },

            submitFormTag(){
                let data={
                    "google":this.google3,
                    "operating":"lists",
                    "type":2,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
             
                    this.listTag=res.data.data;
                });
            },
            edit(id){
                let data={
                    "google":this.google4,
                    "operating":"select",
                    "id":id,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                       this.form=res.data.data;
                    });
            },
            add(){
                this.form={
                        id:0,
                        type:'',
                        title:'',
                        keywords:'',
                        description:0,
                        text:0,
                };
            },
            Submit(operating){
                //this.form.keywords =this.colorKeywords.join(',');
                this.form.text=editor.html();
                let data={
                    "google":this.google,
                    "operating":operating,
                    "form":this.form
                }
               
                this.$axios.post(global.APIPATH,data).then(res => {    
                    this.result=res.data.result;
                    this.submitForm();
                });
            },
           
            imgName(item){
              this.form.image=item;
            },
            radioType(item){
                this.form.type=item;
            },
     
        },
    }

</script>