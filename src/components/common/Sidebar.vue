<template>
<div>
<div class="layout width-200 height-auto border-primary" style="box-sizing:border-box;">
    <div class="layout width-max height-60 line-height-60 padding-bottom-30" style="">
      <!-- <good-logo></good-logo> -->
      <!-- <i class="fa fa-yelp"></i> -->
      <!-- <span class="color-999 float-left font-size-24 bold padding-left-30 padding-right-30" title="退出平台系统">{{constant.webTitle}}</span> -->
    </div>

    <ul id="side" class=" padding-top-10 padding-bottom-30">

    <!-- <template v-for="(item,index) in state.menu2">
      <li class="position-r line-height-36 padding-left-30 menu">
          <router-link active-class="a-link" :to="'/'+item.url" tag="span" class="margin-left-10 pointer" data-module="log">
          <i class="padding-right-13 color-999 fa " :class="item.icon"></i>
          {{item.name}}
          </router-link>
      </li>
    </template> -->
    <recursionchild :data="state.menu2"></recursionchild>  
      <template v-for="(item,index) in state.menu">
        <li class="font-size-14 margin-top-10">
                <div class="title color-333 padding-left-45" @click="open(item,index)">
                    <i class="margin-right-5 font-size-16" :class="item.icon" style="color: #FEA915"></i>
                    <span class=" color-999" data-module="log">
                    {{item.title}}
                    </span>
                    
                </div>
               <transition name="bounceM">
                              
                <ul class="position-r overflow-hidden margin-top-10 ">
                  <template v-for="(item2,index2) in item.children">
           
                    <li class="position-r line-height-36 padding-left-60 menu" v-if="state.authority!=2&&item2.url!='authority'">
                        <router-link active-class="color-primary" :to="'/'+item2.url" tag="span" class="margin-left-10 pointer" data-module="log">{{item2.title}}</router-link>                    
                    </li>

                    <li class="position-r line-height-36 padding-left-60" v-if="state.authority!=2&&item2.url=='authority'">
                        <span class="margin-left-10 color-ccc" style="cursor: not-allowed;" data-module="log">{{item2.title}}</span>                    
                    </li>

                    <li class="position-r line-height-36 padding-left-60 menu" v-if="state.authority==2">
                        <router-link active-class="color-primary" :to="'/'+item2.url" tag="span" class="margin-left-10 pointer" data-module="log">{{item2.title}}</router-link>                    
                    </li>
                   <!--  <li class="position-r line-height-36 padding-left-40 margin-10 margin-bottom-20" v-else>
                        <div class=" padding-left-10 menu2"><i class="el-icon-plus color-ccc padding-right-5 bold"></i>{{item2.title}}</div>
                    </li> -->
                  </template>
                </ul>
                </transition>
            </li>
        </template>
     </ul>

</div>


    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import recursionchild from './Sidebar2.vue'
    export default {
        components: {
            recursionchild
        },
        data() {
            return {
              a:false,
              drawer: false,
            }
        },
        mounted: function() {
        },
        computed: {
            ...mapState(['state']),
        },
        watch: {  
           // 'form.url': 'init',
        }, 
        methods:{
          open(item,index){
            this.state.menu.map((item2,index2)=>{
              item2.select=false;
            })
            item.select=true;
          },
          select(item,Array){
            this.state.menu.map(item2=>{
              item2.children.map(item3=>{
                item3.select=false
              })
            })
            item.select=true;
          },
            submitForm(){
                this.$axios.post(global.APIRETURN).then(res => {
                  console.log(res)
                })
            },
        }
    }
</script>
<style type="text/css">
#side .menu{color: #333}
#side .menu:hover {background-color: rgba(0, 0, 0, 0.03);}
#side .menu2 {border: 2px dashed #D9DADC;}
#side .menu2:hover {border: 2px dashed #b2b2b2;}
</style>