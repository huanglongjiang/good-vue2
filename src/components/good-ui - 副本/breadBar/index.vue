<template>
  <div class="layout margin-10 margin-left-1">
      <ol class="breadbar">
        <li><a>{{constant.breadcrumb.headTitle}}</a></li>
        <template v-for="item in list">
          <li><a>{{item}}</a></li>
        </template>
        <!-- <li><a :href="url" target="_blank"><button class="button button-sm button-primary">查看源码</button></a></li> -->
      </ol>
      <div class="clear"></div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["list"],
      data() {
          return {
             url:'',
             google2:this.google,
             ArraySelected:this.selected,
          }
      },
      created(){
        let domain=window.location.origin;
        let hash=window.location.hash.split('#/')[1];
        if(hash.includes('?')){
          hash=hash.split('?')[0];
        }
        this.url=`${domain}/templates/code/${hash}.html`;
      },
      computed: {
            ...mapState(['state']),
        },
      watch: {
        random(){
            this.google2=this.google;
            this.ArraySelected=this.selected;
        },
      },
      methods:{
        //数据状态
        editAll(item){
            let data={
                "google":this.google2,
                "operating":"editAll",
                "from":{
                    'status':item,
                    "selected":this.ArraySelected,
                }
            }
            this.$axios.post(global.APIPATH,data).then(res => {
                this.$emit('getBack',item);           
            });
            
        },
      }
    }
</script>