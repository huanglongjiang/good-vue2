<template>
    <div class="wrapper" style="min-width:1200px;">
        <v-head :class="{'fixed-header':state.topFixed}"></v-head>
        <v-sidebar class=" position-a left-0 top-0 bottom-0 z-index-10" :class="{'fleft-220':!state.sidebar,'left-0':state.sidebar}" style="transition:all 0.1s ease;"></v-sidebar>
        <div class="content padding-bottom-40 padding-right-20"
            :class="{'margin-top-70':state.topFixed,'margin-top-10':!state.topFixed,'padding-left-220':state.sidebar,'padding-left-20':!state.sidebar}" style="min-height:450px;transition:all 0.1s ease;">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
        <v-footer :class="{'padding-left-220':state.sidebar,'padding-left-20':!state.sidebar}" style="transition:all 0.1s ease;"></v-footer>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vFooter from './footer.vue';
    export default {
        components:{
            vHead, vSidebar,vFooter
        },
        computed: {
            ...mapState(['state']),
        },
    }
</script>
<style>

body{background: url('https://gss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2017-11-02/463435943c62c9cca34412ba73112a77.jpg') -150px 60px no-repeat;}
.fixed-header{position:fixed; top: 0px; right: 0px;}
.padding-left-220{padding-left: 220px;}
.fleft-220{left: -220px;}
.width-600 {
    width: 600px;
}
body{background: #f6f8f9}
.table-data .table-group th{border: 0px;background: white}
.table-data .table-group td{border-left: 0px;border-right: 0px;border-bottom: 0px;}
.tag-group{margin: 0px;}
.webuploader-pick{background: #0084FF!important;}
.color-primary,.a-link,{color: #409eff}
.table-data .table-group th{padding: 8px; color: #909399;}
.table-data .table-group td{padding: 6px;}
.a-link{color: #0084ff}
.el-input__inner{height: 34px;}
/*.tag-group{font-size: 12px;}*/
  /*   .tag-group .tag-block{border-radius: 3px;}
  .a-link{color: #0084FF}
  .table-data .table-group td{padding: 5px;}
  .table-data .table-group td,.table-data .table-group th{
  text-align: center;
  color: transparent;
  letter-spacing: 0.1em;
  text-shadow: this is the real color of the text - just blurred 0 1px 0px rgb(88,92,42), these are the dark inset shadows the second one add a sharper look and depth to the top of the letters 0 1px 0 rgba(0,0,0,1), 0 1px 0 rgba(0,0,0,0.45), these are the highlights - using rgba you can change the last value if they are too (or too little) bright 0 1px 0 rgba(255,255,255,0.5), 0 1px 0px rgba(255,255,255,0.2);
  
  
  }
  .textline{position: relative;}
  .textline:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  }
  .textline:before {
  z-index: 10;
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: -3px;
  left: 0;
  background: #0084FF;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.5s cubic-bezier(1, 0.25, 0, 0.75) 0s;
  }
  
  .textline2{position: relative;}
  .textline2:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  }
  .textline2:before {
  z-index: 10;
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: -3px;
  left: 0;
  background: #f00;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.5s cubic-bezier(1, 0.25, 0, 0.75) 0s;
  }
  .keys{text-align: center;
  color: transparent;
  letter-spacing: 0.1em;
  text-shadow: this is the real color of the text - just blurred 0 1px 0px rgb(88,92,42), these are the dark inset shadows the second one add a sharper look and depth to the top of the letters 0 1px 0 rgba(0,0,0,1), 0 1px 0 rgba(0,0,0,0.45), these are the highlights - using rgba you can change the last value if they are too (or too little) bright 0 1px 0 rgba(255,255,255,0.5), 0 1px 0px rgba(255,255,255,0.2);
  
  }
  i{text-shadow: initial;}
  .el-pager li.active{border-color: #0084FF;
  background-color: #0084FF;}
  .button-primary{background: #0084FF;}
  .fa-check-square,.fa-square-o{width: 14px; height: 14px;}
  .webuploader-pick{background: #0084FF!important;} */
  .el-tag{height: 24px; line-height: 22px;}
</style>