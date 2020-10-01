<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <breadBar :list="['登录日志']"></breadBar>
        <div class="layout">
            <div class="table-data" style="margin:0px">
                <table class="table-group line-height-30" style="border-left:0">
                    <thead class="block-header">
                        <tr>
                            <th class="width-auto" style="text-align:center">序号</th>
                            <th>访客头像</th>
                            <th>登录日期</th>
                            <th>登录用户</th>
                            <th>登录邮箱</th>
                            <th>用户角色</th>
                            <th>来源IP</th>
                            <th>对象类型</th>
                            <th>操作类型</th>
                            <th>操作结果</th>
                            
                        </tr>
                    </thead>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                        <tr>
                            <td class="color-default align-center" style="background: #f6f6f6;">
                                <span class="color-666" v-if="init.page==0">{{init.total-index}}</span>
                                <span class="color-666" v-else>{{init.total-(init.page*init.pagesize+index)}}</span>
                            </td>
                            <td>
                                <img :src="'static/RandomUser/'+item.image" alt="" class="width-30 height-30 radius-20 float-left" >

                            </td>
                            <td style="border-left:0px;">{{item.time}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.email}}</td>
                            <td>
                                <span v-if="item.role==0" class="color-white background-two padding-3 padding-left-5 padding-right-5">普通用户</span>
                                <span v-if="item.role==1" class="color-white background-three padding-3 padding-left-5 padding-right-5">管理员</span>
                                <span v-if="item.role==2" class="color-white background-one padding-3 padding-left-5 padding-right-5">超级管理员</span>
                            </td>
                            <td>{{item.ip}}</td>
                            <td>{{item.obj}}</td>
                            <td>{{item.type}}</td>
                            <td style="border-right:0px;">{{item.result}}</td>
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
    </div>
</template>

<script>
    import breadBar from '../common/breadBar'
    export default {
        components: {
            breadBar
        },
        data: function(){
            return {
                list:'',
                google:"t-10001",
                init:{
                    pagesize:10,
                    page:0 ,
                    total:0,
                    currentPage1:1,
                },
            }
        },
        created: function() {
            this.dataList();
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
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.init.total=res.data.total;
                })
            },
     
        },
    }
</script>
