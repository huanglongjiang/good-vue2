<template>
<div class="float-left">
  <span class="color-default font-size-12">{{text}}</span>
  <el-date-picker
  v-model="time"
  type="date"
  placeholder="选择日期时间">
</el-date-picker>
<!-- <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker> -->
</div>
</template>

<script>
    export default {
      props:['date','text'],
      model:{
        prop:'date',
        event:'input',
      },
      data() {
          return {
            time:this.date,
          }
      },
      watch: {
        time(val) {
          console.log(val)
          this.$emit('input',val)
        }
      },
    }
</script>