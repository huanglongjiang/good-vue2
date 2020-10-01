<template>
  <div>
    <el-dialog
      width="70%"
      top="7vh"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div slot="title">
        <span class="result-check-tips">{{title}}</span>
      </div>
      <c-table
        :isPage="false"
        :data="list"
        :columns="header"
        dragTableKey="dragTableKeyCheckResult"
      >
        <template slot="num" slot-scope="item">
          <div>{{item.bodyItemIndex+1}}</div>
        </template>
      </c-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="mini">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      title: "",
      list: [],
      header: []
    };
  },
  methods: {
    getProductCheckResult(options) {
     this.type=options.type;
      this.title = options.msg;
      this.list = options.data;
      this.dialogFormVisible = true;
    },
    cancel() {
      this.dialogFormVisible = false;
    }
  }
};
</script>
————————————————
版权声明：本文为CSDN博主「易01」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u012733501/java/article/details/99675808