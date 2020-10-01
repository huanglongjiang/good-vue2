<template>
 <div class="layout border-default background-white" style="border-bottom:0px;">
        <div class="tag-group border-0">
          <span class="tag-type margin-left-10 inline-block width-100 align-right color-ccc">{{tagName}}：</span>
          <a class="tag-block" :class="{'tag-primary':arrayList.all.selected}" @click="tag('',tagList,type)">{{arrayList.all.value}}</a>
          <template> 
            <template v-for="(item,index) in arrayList.list">
                <a class="tag-block" :class="{'tag-primary':item.selected}" @click="tag(item,tagList,type)">{{item.value}}</a>
            </template>
          </template>
        </div>
  </div> 
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["type","tagName","list","json","random",'selected'],
      data() {
          return {
            google2:this.google,
            tagList:[],
            arrayList:{}
          }
      },
      created: function() {
        let all={'value':'全部','selected':true}
        if(this.json){
          // 对象改造
          this.tagList=this.list.map((item,index)=>{
            return {'id':item.id,'value':item.name,'selected':false}
          })
        }else{
          // 数组改造
          this.tagList=this.list.map((item,index)=>{
            return {'id':index,'value':item,'selected':false}
          })
        }

        Object.assign(this.arrayList,{"all":all,"list":this.tagList})

        // 默认高亮状态
        if(this.selected!=undefined&&this.selected!='all'){
          this.arrayList.list.map((item,index)=>{
            if(this.selected==item.id){
              item.selected=true; 
              this.arrayList.all.selected=false;
            }else{
              item.selected=false;
            }
          })
        }
        
      },
      computed: {
            ...mapState(['state']),
      },
      watch: {
        random(){
            this.google2=this.google;
        },
      },
      methods:{
        tag(item,list,type){

          let index='';
         
            this.tagList.map((item2,index2)=>{
              if(item===''){  //全部
                this.arrayList.all.selected=true;
                item2.selected=false;
              }
              else if(item===item2){
                item2.selected=true;
                index=item2.id;
                this.arrayList.all.selected=false;
              }else{
                item2.selected=false;
                
              }
              
            })
         

            let path=this.$route.path;
            const pathArray=[
                    {'value':'link','num':1},
                    {'value':'user','num':1},
                    {'value':'article','num':1},
                    {'value':'slider','num':1},
                    {'value':'picture','num':1},
                    {'value':'adsense','num':2},
                    {'value':'help','num':1},
                  ];
                  //1、type、status同时存在  2、只有status,3、只有type
             
            pathArray.forEach((item3)=>{            //地址栏更新
              if(("/"+item3.value)==this.$route.path){

                if(item3.num==1){
                    if(type=="type"){
                      index===""?(this.state.paramsType='all'):(this.state.paramsType=index);
                      this.state.paramsStatus=this.$route.query.status;
                    }
                    
                    if(type=="status"){
                      index===""?(this.state.paramsStatus='all'):(this.state.paramsStatus=index);
                      this.state.paramsType=this.$route.query.type;
                    }
                    var params="type="+this.state.paramsType+"&status="+this.state.paramsStatus;
                    
                }
                if(item3.num==2){
                    if(type=="status"){
                      index===""?(this.state.paramsStatus='all'):(this.state.paramsStatus=index);
                    }
                    var params="status="+this.state.paramsStatus;
                }
                if(item3.num==3){
                    if(type=="type"){
                      index===""?(this.state.paramsType='all'):(this.state.paramsType=index);
                    }
                    var params="type="+this.state.paramsType;
                }
              
                this.$router.push(path+'?'+params);
              }
            }) 
          this.$emit('getBack',item); 
        },
      }
    }
</script>