<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.article" />
        <good-box data="true">
        <good-tag tagName="栏目" :list="listTitle" :selected.sync='init.fid' :json="true" v-if="listTitle.length>0" />
        <good-tag tagName="自定义属性" :list="constant.filter.article.status" :selected.sync='init.type' />
        </good-box>
        <good-menu>
            <good-search class="float-left margin-right-10" v-model="init.name"></good-search>
            <good-statusall :google="google" :selected="selected" :random.sync='random' v-if="state.permission.article_status_all"></good-statusall>
            <router-link to="/article/action?type=1" tag="a" v-if="state.permission.article_add">
                <good-button class='float-right' icon="el-icon-edit" type="primary">新增文章</good-button>
            </router-link>

            <good-total class="float-right" :total='init.total' ></good-total>
            <div class="clear"></div>
        </good-menu>

        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th style="width：50px" v-if="state.permission.article_status_all">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th>
                            <th>缩略图</th>
                            <th>发布作者</th>
                            <th>所属栏目</th>
                            <th>标题</th>
                            <th>创建时间</th>
                            <th>状态</th>
                            <th v-if="state.permission.article_edit || state.permission.article_delete">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}">
                                <td v-if="state.permission.article_status_all">
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else="selected.includes(item.id)">选择</template>
                                    </good-checkbox>
                                </td>
                                <td class="position-r">
                                <good-paper background="background-one" v-if="item.type==3">推荐f</good-paper>
                                <good-paper background="background-tow" v-if="item.type==2">热门</good-paper>
                                <good-paper background="background-three" v-if="item.type==1">优质</good-paper>
                               
                                
                                <div class="line-height-30 padding-3">
                                        <img class="width-auto height-60 block" :src="filePath+'/'+item.file" v-if="item.file!=''">
                                        <img class="width-auto height-60 block" src="static/images/tianmao.jpg" alt="" v-else>
                                    </div>
                                </td>
                                <td>{{item.account}}</td>
                                

                                <td>
                                    <template v-for="(items,index) in item.parentName">
                                        <span class=" padding-2 padding-left-5 padding-right-5 margin-bottom-10">{{items}}
                                            <template v-if="index+1<item.parentName.length">、</template>
                                        </span>
                                    </template>
                                </td>
                                
                                <td>
                                    <div class="width-max break">
                                        <router-link tag="span" class=" a-link textline pointer" :to="{path:'/article/action',query: {type:2,templateId: item.id}}">{{item.title}}</router-link>
                                    </div>
                                </td>
                                <td>{{item.insertTime}}</td>
                                <td>
                                    <good-switch :val.sync='item' :aaa.sync='statusVal' :key="index" v-if="state.permission.article_status"></good-switch>
                                    <good-status :val='item' :key="index" v-else></good-status>
                                </td>
                                <td>
                                    <template>
                                        <router-link tag="a" class="a-link pointer none-line" :to="{path:'/article/action',query: {type:2,templateId: item.id}}" v-if="state.permission.article_edit">
                                        <good-button2 @click="select(item)">改</good-button2>
                                        </router-link>
                                        <good-button2 v-if="state.permission.article_delete" @click="remove(item)">弃</good-button2>
                                    </template>
                                </td>
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>
        </good-box>
        <good-pagination :page.sync="init" v-if="list"></good-pagination>

</good-page>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data: function(){
            return {
                filePath:global.filePath,
                randomVal:'',
                listTitle:'',
                titleVal:0, 
                statusVal:0,
                typeVal:0,
                list:'',
                selected: [],
                random:'',
                result:'',
                google:"t-10008",
                google2:"t-10016",
                init:{
                    fid:'',
                    type:'',
                    title:'',
                    pagesize:10,
                    page:0,
                    total:0,
                    currentPage1:1,
                },
                form:{
                    id:0,
                    name:'',
                    title:'',
                    email:'',
                    type:'',
                    status:0,
                    price:'',
                    text:'',
                },
                params:{
                    type:'',
                    status:'',
                }
            }
        },
        watch: {  
            'random': 'dataList',
            'init.title': 'dataList',
            'init.page': 'dataList',
            'init.pagesize': 'initFn',
            'init.fid':'dataList',
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
            this.submitFormTitle();
        },
        methods: {
            
            initFn(val) {
                this.dataList();
                this.$route.query.type=="all"?this.init.fid='':this.init.fid=this.$route.query.type;
                this.$route.query.status=="all"?this.init.type='':this.init.type=this.$route.query.status;
            },

            dataList(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                    "fid":this.init.fid,
                    "type":this.init.type,
                    "title":this.init.title,
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.init.total=res.data.total;
                });
            },
            submitFormTitle(){
                const data={
                    "google":this.google2,
                    "operating":"lists",
                    "type":2,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.listTitle=res.data.data;
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
                        if(res.status==200){
                            this.dataList(); 
                        }       
                    })
                })
            },
            
        },
    }
</script>