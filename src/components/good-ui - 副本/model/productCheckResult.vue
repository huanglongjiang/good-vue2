<template>
  <div v-if="show">
    <div class="panel-backdrop"></div>
    <div class="popover-success" v-if="type==='success'">
      <div class="popover-success-top">
          <div class="popover-success-ico"></div>
          <div class="popover-success-title1">{{list}}</div>
          <div class="popover-success-title2">{{title}}</div>
      </div>
      <div class="popover-success-bottom">
          <div class="button button-sm button-primary" @click="cancel()">关闭</div>
      </div>
    </div>

    <div class="popover-danger" v-if="type==='error'">
      <div class="popover-danger-top">
        <div class="popover-danger-ico"></div>
        <div class="popover-danger-title1">操作失败</div>
        <div class="popover-danger-title2">您没有权限删除该项目！</div>
      </div>
      <div class="popover-danger-bottom">
        <div class="button button-sm button-primary" @click="cancel()">关闭</div>
      </div>
    </div>

    <div class="popover-info" v-if="type==='info'">
      <div class="popover-info-top">
        <div class="popover-info-ico"></div>
        <div class="popover-info-title1">提示</div>
        <div class="popover-info-title2">{{title}}</div>
      </div>
      <div class="popover-info-bottom">
        <div class="button button-sm button-default" @click="cancel()">关闭</div>
        <div class="button button-sm button-primary" @click="next()">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bool:false,
      show:false,
      type:'',
      dialogFormVisible: false,
      title: "",
      list: [],
      header: [],
      callback:'',
      options:null,
    };
  },
  methods: {
    message2(options) {
      this.type=options.type;
      this.show=options.visible;
      this.title = options.msg;
      this.list = options.data;
      this.dialogFormVisible = true;
      this.callback = options.callback;
      this.options=options
    },
    cancel() {
      this.show = false;
    },
    next() {
      this.show = false;
    },
  }
};
</script>