<template>
<div>
  
  <div class="layout float-left margin-top-5">
            <template v-if="selected.length!=0">
            <div class="width-80 height-25 line-height-25 align-center radius-30 font-size-12 color-white inline-block pointer margin-right-5 background-primary" style="box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);" @click="editAll(1)">批量开启</div>

            <div class="width-80 height-25 line-height-25 align-center radius-30 font-size-12 color-white inline-block pointer background-primary" style="box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);" @click="editAll(0)">批量关闭</div>
            </template>
            <template v-else>
              <div class="width-80 height-25 line-height-25 align-center radius-30 font-size-12 color-999 inline-block margin-right-5" style="background: #eceeef;box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);">批量开启</div>
              <div class="width-80 height-25 line-height-25 align-center radius-30 font-size-12 color-999 inline-block" style="background: #eceeef;box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);">批量开启</div>
            </template>
            
        </div>
</div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["google","selected","random"],
      data() {
          return {
             google2:this.google,
             ArraySelected:this.selected,
          }
      },
      computed: {
            ...mapState(['state']),
        },
      methods:{
        //数据状态
        editAll(item){
            let data={
                "google":this.google2,
                "operating":"editAll",
                "from":{
                    'status':item,
                    "selected":this.selected,
                }
            }
            this.$axios.post(global.APIPATH,data).then(res => {
                const options={
                    type:'success',
                    message:res.data.result,
                }
                this.$message(options);

                this.$emit('update:random',Math.round(Math.random()*10000));           
            });
            
        },
      }
    }
</script>