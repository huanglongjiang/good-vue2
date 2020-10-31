<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.authority" />
        <good-menu>
            <good-button class='float-right' icon="el-icon-edit" type="primary"  @click="openColumn(2,'新增栏目')">新增栏目</good-button>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>
        <good-box :data="viewList">
         <el-table
                :data="viewList"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="label"
                  label="栏目名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="url"
                  label="url">
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="code">
                </el-table-column>
                <el-table-column
                  prop="level"
                  label="level">
                </el-table-column>
                
                <el-table-column
                  align="right">
                  <template slot="header" slot-scope="scope">
                    操作
                  </template>
                  <template slot-scope="scope">
                    <el-button v-if="(scope.row.leaf==1&&scope.row.type==0)||scope.row.leaf==1&&scope.row.type==1"
                      size="mini"
                      @click="openColumn(scope.row,'新增栏目')">新增子项</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="select(scope.row,'编辑标签')">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            <!-- <div class="table-data">
                <table class="table-group">
                    <thead class="block-header">
                        <tr>
                            <th>栏目名称</th>
                            <th>url</th>
                            <th>code</th>
                        </tr>
                    </thead>
                    <tbody>
                    <template v-for="(item,index) in viewList">
                        <tr>
                            <td>
                                <span class="pointer keys" @click="select(item,'编辑标签')">{{index+1}}、{{item.name}}</span>
                            </td>
                            <td>{{item.url}}</td>
                            <td>{{item.code}}</td>
                        </tr>
                    </template>    
                    </tbody>
                </table> 
            </div>  -->   
        </good-box>  
        <!-- 模态框 -->
          <good-dialog :title="columnTitle" :visible.sync='dialogVisible'>
            <div slot="body">
                <div class="table-default">
                    <table class="table-group">
                        <tr>
                            <tds-label star>名称</tds-label>
                            <td><el-input v-model="form.label"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label star>url</tds-label>
                            <td><el-input v-model="form.url"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label star>icon</tds-label>
                            <td><el-input v-model="form.icon"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label star>类型</tds-label>
                            <td>
                                <el-radio v-model="form.type" label="0">目录</el-radio>
                                <el-radio v-model="form.type" label="1">菜单</el-radio>
                                <el-radio v-model="form.type" label="2">按钮</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <tds-label star>是否含有子项</tds-label>
                            <td>
                                <el-radio v-model="form.leaf" label="1">含有子项</el-radio>
                                <el-radio v-model="form.leaf" label="0">没有子项</el-radio>
                            </td>
                        </tr>
                        
                        <tr>
                            <tds-label star>code</tds-label>
                            <td><el-input v-model="form.code"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label star>序号</tds-label>
                            <td><el-input v-model="form.level"></el-input></td>
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
                <good-button type="default" @click="dialogVisible = false">取 消</good-button>
                <good-button type="primary" @click="Submit('update')">确 定</good-button>
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
                google:"t-20012",
                google2:"t-20012",
                init:{
                    name:'',
                    pagesize:10,
                    page:0,
                    total:0,
                },
                rows:0,
                form:{
                    id:0,
                    parentId:'',
                    label:'',
                    image:'',
                    code:'',
                    icon:'',
                    type:'0',
                    leaf:'1',
                    url:'',
                    level:'',
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
                console.log(item)
                let parentId='';
                if(item){
                    parentId=item.id;
                }
                this.dialogVisible=true
                this.btnSubmit=0;
                this.columnTitle=title;
                this.form={
                        type:item,
                        parentId:parentId,
                        label:'',
                        image:'',
                        code:'',
                        icon:'',
                        type:'0',
                        leaf:'1',
                        url:'',
                        level:'',
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
                    if(res.data.retType=='success'){
                        this.dataList();
                        this.dialogVisible=false;
                        this.dialogVisible2=false;
                    }
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