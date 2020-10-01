<template>
     <div class="position-f left-0 bottom-0 height-45 line-height-45 padding-right-30 border-bottom-5 border-primary" style="border-color:#f59e00; width:600px; margin-left:-300px; left:50%;box-shadow:0px -1px 1px #ccc; border-top-left-radius:60px; border-top-right-radius:60px; background:rgb(43, 49, 49)" v-if="selected.length!=0">
      <!-- :class="{'none':selected.length==0}" -->
                <div class="color-white clearfix">
                    
                    <div class="float-left font-size-16 margin-left-200 pointer" @click="editAll(1)">
                        <i class="button-ico fa fa-eye"></i>
                        <span>批量开启</span>
                    </div>
                    <div class="float-left font-size-16 margin-left-50 pointer" @click="editAll(0)">
                        <i class="button-ico fa fa-eye-slash"></i>
                        <span>批量关闭</span>
                    </div>
                    <div class="float-right font-size-14 color-white" :class="{'none':selected.length==0}">{{result}}</div>
                </div>
     </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["google","selected","random"],
      data() {
          return {
             result:'',
             google2:this.google,
             ArraySelected:this.selected,
          }
      },
      computed: {
            ...mapState(['state']),
        },
      watch: {
        random(){
            this.google2=this.google;
            this.ArraySelected=this.selected;
            if(this.ArraySelected.length==0){
              this.result="";
            }
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
                this.result=res.data.result;
                this.$emit('getBack',Math.round(Math.random()*10000));           
            });
            
        },
      }
    }
</script>