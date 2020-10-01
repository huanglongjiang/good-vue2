<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.root" />
        <good-menu>
            <good-button class='float-right' icon="el-icon-edit" type="primary"  @click="openColumn(2,'新增栏目')">新增栏目</good-button>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>
        <good-box :data="viewList">
            <div class="table-data">
                <table class="table-group">
                    <thead class="block-header">
                        <tr>
                            <th>栏目名称</th>
                            <th>关键词</th>
                        </tr>
                    </thead>
                    <tbody>
                    <template v-for="(item,index) in viewList">
                        <tr v-if="item.type==2">
                            <td>
                                <span class="pointer keys" @click="select(item,'编辑标签')">{{index+1}}、{{item.name}}</span>
                            </td>
                            <td>
                                <div class="layout keys">
                                <template v-if="item.keywords!=''">
                                    <template v-for="(item,index) in item.keywords.split(',')">

                                    <el-tag
                                        :key="index"
                                        type="info" class="margin-right-10">
                                        {{ item }}
                                      </el-tag>

                                    </template>
                                </template>
                               <el-button class="button-new-tag" size="small"  @click="openColumn2(item)">+ 新增</el-button>
                                </div>


                            </td>
                        </tr>
                    </template>    
                    </tbody>
                </table> 
            </div>    
        </good-box>  
        <!-- 模态框 -->
          <good-dialog :title="columnTitle" :visible.sync='dialogVisible'>
            <div slot="body">
                <div class="table-default">
                    <table class="table-group">
                        <tr>
                            <tds-label star>名称</tds-label>
                            <td><el-input v-model="form.name"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>缩 略 图</tds-label>
                            <td>
                                <good-upload id="u7" type="article_title " :data.sync='form'></good-upload>
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


          <good-dialog :title="columnTitle" :visible.sync='dialogVisible2'>
            <div slot="body">
                <div class="table-default">
                    <good-key :data.sync="listKeywords" v-if="dialogVisible2"></good-key>
                </div>
            </div>
            <div slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="Submit('update')">确 定</el-button>
            </div>
        </good-dialog>   
</good-page>
</template>

<script>
    export default {
        data: function(){
            return {
                dialogVisible:false,
                dialogVisible2:false,
                btnSubmit:0,
                columnTitle:'新增栏目',
                listTitle:[],
                listKeywords:[],
                colorKeywords:[],
                filterText:"",
                filterText2:"",
                keywords:'',
                addkeywords:'',
                google:"t-10016",
                google2:"t-20006",
                init:{
                    name:'',
                    pagesize:10,
                    page:0,
                    total:0,
                },
                rows:0,
                form:{
                    id:0,
                    name:'',
                    image:'',
                    file:'',
                    url:'',
                },
                currentPage1: 1,
            }
        },
        computed: {
            // 搜索功能
            viewList(){
                const arr=[];
                if(this.listTitle==null){return}
                this.listTitle.forEach((item,index)=>{
                    if(this.filterText !== '' && item.name.includes(this.filterText)){
                        arr.push(item);
                    }else if(this.filterText === ''){
                        arr.push(item);
                    }
                });
                return arr;
            },

            /*viewKeyList(){
                const arr = [];
                if(this.listKeywords==null){return}
                this.listKeywords.forEach((item,index)=>{
                    if(this.filterText2 !== '' && item.name.includes(this.filterText2)){
                        arr.push(item);
                    }else if(this.filterText2 === ''){
                        arr.push(item);
                    }
                });
                return arr;
            }*/
        },
        created: function() {
            this.dataList();
            this.keyList();
        },
        watch: { 
          'listKeywords':function(val){
            this.form.keywords=val.join(',')
          }
        },
        methods: {
            keyList(){
                const data={
                    "google":this.google2,
                    "operating":"lists",
                    "name":this.keywords,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                   // this.listKeywords=res.data.data;
                });
            },
            dataList(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                    "name":this.init.name,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.listTitle=res.data.data;
                    this.init.total=res.data.total;
                });
            },
            select(item,title){
                console.log(item)
                this.form={...item};
                this.dialogVisible=true;
                this.btnSubmit=1;
                this.columnTitle=title;
                
            },
            openColumn(item,title){
                this.dialogVisible=true
                this.btnSubmit=0;
                this.columnTitle=title;
                this.form={
                        type:item,
                        name:'',
                        image:'',
                        url:'',
                };
            },
            openColumn2(item){
                this.dialogVisible2=true;
                this.form=item;
                this.listKeywords=item.keywords==''?[]:this.listKeywords=item.keywords.split(',');

            },
       
            Submit(string){
                let data={
                    "google":this.google,
                    "operating":string,
                    "form":this.form
                }
                this.$axios.post(global.APIPATH,data).then(res => {  
                    this.dataList();
                    this.dialogVisible=false;
                    this.dialogVisible2=false;
                });
            },
            imgName(item){
              this.form.image=item;
            },
            checkKeywords(item){
                this.result2="";
                let has=this.colorKeywords.includes(item.name);
                if(!has){
                    if(this.colorKeywords.length<5){
                        this.colorKeywords.push(item.name);
                    }else{
                        const options={
                            type:"success",
                            message:"关键词最多只能有5个！",
                        }
                        this.$hlj.message(options)
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

        },
    }
</script>
<style scoped>
   .tag-group .tag-block{display: inline-table;}
   .tag-group .tag-block:hover{color: #333;}
</style>