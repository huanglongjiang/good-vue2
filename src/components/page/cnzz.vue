<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.cnzz" />
        <good-menu>
            <good-statusall :google="google" :selected="selected" v-if="state.permission.cnzz_status_all" :random.sync='random'></good-statusall>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>
        <good-box data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-100" v-if="state.permission.cnzz_status_all">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th>
                            <th class="width-100">统计类型</th>
                            <th class="width-auto">code</th>
                            <th class="width-100">服务状态</th>
                            <th class="width-100" v-if="state.permission.cnzz_edit">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                        <tr :class="{'background-disabled':item.status==0}">
                            <td v-if="state.permission.cnzz_status_all">
                                <good-checkbox v-model="selected" :label="item.id">
                                    <template v-if="selected.includes(item.id)">已选择</template>
                                    <template v-else>选择</template>
                                </good-checkbox>
                            </td>
                            <td><span>{{item.type}}</span></td>
                            <td><span>{{item.code}}</span></td>
                            <td>
                                    <good-switch :val.sync='item' :aaa.sync='statusVal' :key="index" v-if="state.permission.cnzz_status"></good-switch>
                                    <good-status :val='item' :key="index" v-else></good-status>
                                </td>
                            <td>
                                <good-button2 v-if="state.permission.cnzz_edit" @click="select(item)">改</good-button2>
                            </td>
                        </tr>
                       </template>
                    </tbody>
                </table> 
            </div>
        </good-box>

        <!-- 模态框 -->
        <good-dialog :title="form.type+'统计'" :visible.sync='dialogVisible'>
            <div slot="body">
                <div class="table-default">
                    <table class="table-group">
                        <tr>
                            <tds-label>统计类型：</tds-label>
                            <td><el-input v-model="form.type" :disabled="true"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>服务状态：</tds-label>
                            <td>
                                <el-radio v-model="form.status" label="0">关闭</el-radio>
                                <el-radio v-model="form.status" label="1">开启</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <tds-label>统计代码：</tds-label>
                            <td><el-input type="textarea" :rows="6" v-model="form.code" placeholder="请输入内容"></el-input></td>
                        </tr>
                    </table> 
                </div>
            </div>
            </div>
            <div slot="footer">
                <good-button type="default" @click="dialogVisible = false">取 消</good-button>
                <good-button type="primary" @click="Submit">确 定</good-button>
            </div>
        </good-dialog>
        <!-- 模态框 -->
        <!-- 模态框 -->
    </good-page>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data: function(){
            return {
                random:'',
                dialogVisible:false,
                statusVal:'',
                list:'',
                selected: [],
                google:"t-10009",
                init:{
                    pagesize:10,
                    page:0,
                    total:0,
                },
                form:{
                    id:'',
                    type:'',
                    text:'',
                    status:'1'
                },
            }
        },
        watch: {  
            'random': 'dataList',
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
        created: function() {
            this.dataList();
        },
        methods: {

            dataList(){
                const data={
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
            select(item){
                this.dialogVisible=true;
                this.form={...item}
            },
            Submit(){
                const data={
                    "google":this.google,
                    "operating":"update",
                    "form":this.form
                }
                this.$axios.post(global.APIPATH,data).then(res => { 
                    this.dialogVisible = false;
                    this.dataList();
                });
            },
        },
    }
</script>