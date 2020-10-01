<template>
<div class="layout align-right margin-top-10">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage1"
      :page-sizes="[10,15,20,25]"
      :page-size="parseInt(page.pagesize)"
      layout="total, sizes, prev, pager, next, jumper"
      :total="parseInt(page.total)">
    </el-pagination>
</div>
</template>

<script>
    export default {
      props: ["page"],
      data() {
          return {
             
          }
      },
      methods: {
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
                this.page.pagesize=val;
                this.$emit('update:page', this.page);
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                this.page.page=val-1;
                this.$emit('update:page', this.page);
            },
      }
      
    }
</script>