<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.bbs" />
        <good-menu>
            <good-button type="primary" icon="el-icon-edit" class="float-right margin-left-20" v-if="state.permission.bbs_add" @click="openBbc">留言</good-button>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>
        <good-box data="list">

            <div class="table-data">
                    <table class="table-group line-height-30">
                        <thead class="block-header">
                            <tr>
                                <th>头像</th>
                                <th>名称</th>
                                <th>访问IP</th>
                                <th>留言内容</th>
                                <th>留言时间</th>
                            </tr>
                        </thead>
                        </thead>
                        <tbody>
                            <template v-for="(item,index) in list">
                            <tr>
                                <td>
                                    <img :src="'static/RandomUser/'+item.image" alt="" class="width-30 height-30 margin-auto radius-20 float-left" style="display: inherit;">
                                </td>
                                <td><span>{{item.account}} <span class="color-999">({{item.name}})</span></span></td>
                                <td>{{item.ip}}</td>
                                <td><span>{{item.text}}</span></td>
                                <td>{{item.time}}</td>
                            </tr>
                           </template>
                        </tbody>
                    </table> 
                </div>
     
 
        </good-box>
        <good-pagination :page.sync="init"></good-pagination>
        <!-- 模态框 --> 
        <good-dialog :title="userTitle" :visible.sync='dialogVisible'>
            <div slot="body">
               <div class="table-default">
                  <table class="table-group">
                      <tr>
                        <tds-label class=" position-r">
                          <div class="position-a top-10 right-10">留言内容</div>
                        </tds-label>
                        <td><el-input type="textarea" :rows="6" v-model="form.text" placeholder="请输入内容"></el-input></td>
                      </tr>
                  </table> 
              </div>
            </div>
            <div slot="footer">
                <good-button type="primary" @click="Submit()">确 定</good-button>
            </div>
        </good-dialog>
        <!-- 模态框 -->
    </good-page>
</template>

<script>
    import onOff from '../common/onOff'
    import { mapState } from 'vuex'
    export default {
        components: {
            onOff
        },
        data: function(){
            return {
                randomVal:'',
                dialogVisible:false,
                statusVal:true,
                google:"t-10015",
                list:'',
                init:{
                    pagesize:10,
                    page:0 ,
                    total:0,
                    currentPage1:1,
                },
                form:{
                    id:'',
                    text:'',
                },
            }
        },
        watch: {  
            'init.page': 'dataList',
            'init.pagesize': 'dataList',
        }, 
        computed: {
            ...mapState(['state']),
        },
        created: function() {
            this.dataList();
        },
        methods: {
            dataList(){
                let data={
                    "google":this.google,
                    "operating":"lists",
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.init.total=res.data.total;
                });
            },
            openBbc(){
                this.dialogVisible=true;
            },
            Submit(){
                let data={
                    "google":this.google,
                    "operating":"insert",
                    "form":this.form,
                }
          
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.dialogVisible=false;
                    this.dataList();
                    this.form.text="";
                });
            },
        },
    }
</script>