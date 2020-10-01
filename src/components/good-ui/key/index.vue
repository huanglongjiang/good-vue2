<template>
  <div class="layout">

    <el-tag v-for="item in selectList" :key="item" closable :type="item" @close="handleClose(item)" v-if="selectList!=''">  {{item}} </el-tag>
    <div class="border-bottom-1 border-eee padding-bottom-20 margin-bottom-20" style="overflow: auto;"></div>
    <div class="align-center clearfix">
        <template v-for="(item,index) in keyList">
           
            <div class="layout margin-bottom-10 pointer" @click="add(item)">
              <template v-if="selectList.includes(item.name)">
                <el-tag class="float-left margin-5">{{item.name}}</el-tag>
              </template>
              <template v-else>
                <el-tag type="info" class="float-left margin-5">{{item.name}}</el-tag>
              </template>
            </div>
        </template> 
    </div>
    <good-pagination :page.sync="init"></good-pagination>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["data"],
      data() {
          return {
            selectList:[...this.data],
            google:"t-20006",
            keyList:[],
            init:{
                name:'',
                total:0,
                pagesize:100,
                page:0,
            },
          }
      },
      computed: {
            ...mapState(['state']),
        },
      watch: { 
          'init.page': 'dataList',
          'init.pagesize': 'dataList',
      },
      mounted() {
          this.dataList();
      },
      methods:{
        dataList(){
            const data={
                "google":this.google,
                "operating":"lists",
                "name":this.init.name,
                "pagesize":this.init.pagesize,
                "page":this.init.page,
            }
            this.$axios.post(global.APIPATH,data).then(res => {
                this.keyList=res.data.data;
                this.init.total=res.data.total;
            });
        },
        //数据状态
        checked(item){
            const data={
              "google":this.val.coding,
              "operating":"status",
              "id":this.val.id,
              "status":this.val.status,
            }

            
            this.$axios.post(global.APIPATH,data).then(res => {
              if(res.status==200){
                this.val.status=this.val.status==1?0:1;
                this.$emit('update:val', this.val);
              }
                          
            });
            
        },
        handleClose(tag) {
          this.selectList.map((item,index)=>{
            if(item==tag){
              this.selectList.splice(index,1);
            }
          })
          this.$emit('update:data', this.selectList)
        
      },
      add(tag){
       
          if(this.selectList.includes(tag.name)){
            this.selectList.map((item,index)=>{
              if(item==tag.name){
                console.log(item);
                console.log(tag)
                this.selectList.splice(index,1);
              }
            })
          }else{
            if(this.selectList.length==5){
              let options={
                  type:'warning',
                  message:'最多选择5个关键字',
              }
              this.$message(options);
              return
            }
            this.selectList.push(tag.name)
          }
          console.log(this.selectList)
          this.$emit('update:data', this.selectList)

        
      }
      }
    }
</script>