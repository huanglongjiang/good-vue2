<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <div class="layout margin-10">
            <ol class="breadbar">
              <li><a>后台管理平台</a></li>
              <li class="active">登录日志</li>
            </ol>
            <div class="clear"></div>
        </div>
        <div class="layout margin-left-10 margin-right-0 clearfix">
            <template v-for="item in 18">
            <div class="layout width-200 height-300 background-success margin-right-10 margin-bottom-10 float-left"></div>
            </template>
        </div>
        <div class="layout float-right margin-top-10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage1"
              :page-sizes="[20,25,30,35]"
              :page-size="init.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="rows">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                list:'',
                currentPage1: 1,
                init:{
                    pagesize:'10',
                    page:'0',
                },
            }
        },
        mounted: function() {
            this.submitForm();
        },
        methods: {
            
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.init.pagesize=val;
                this.submitForm();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.init.page=val-1;
                this.submitForm();
            },
           
            submitForm(){
                let data={
                    "google":"t-10001",
                    "operating":10000,
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.rows=res.data.rows;
                })
            },
     
        },
    }
</script>
