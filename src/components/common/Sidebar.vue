<template>
<div>
<div class="layout width-220 height-max border-primary position-a left-0 top-0 bottom-0 z-index-10" style="box-sizing:border-box;">
    <div class="layout width-max height-60 line-height-60" style="">
      <!-- <good-logo></good-logo> -->
      <!-- <i class="fa fa-yelp"></i> -->
      <!-- <span class="color-999 float-left font-size-24 bold padding-left-30 padding-right-30" title="退出平台系统">{{constant.webTitle}}</span> -->
    </div>

    <ul id="side" class=" padding-top-20  padding-right-20">
      <template v-for="(item,index) in state.menu">
        <li class="font-size-14 margin-bottom-10" style="border-bottom: 1px solid #eee;">
                <div class="title color-333 padding-left-40" @click="open(item,index)">
                    <i class="margin-right-10 color-999 font-size-16" :class="item.icon"></i>{{item.title}}
                    
                </div>
               <transition name="bounceM">
                              
                <ul class="position-r overflow-hidden margin-top-10 ">
                  <template v-for="(item2,index2) in item.children">
                    <li class="position-r line-height-36 padding-left-55 menu" v-if="item2.url!=''">
                        <router-link active-class="a-link" :to="'/'+item2.url" tag="span" class="margin-left-10 pointer" data-module="log">{{item2.title}}</router-link>
                          <good-info :data="state.log_total" v-if="item2.title=='登录日志'"></good-info>
                          <good-info :data="state.bbs_total" v-if="item2.title=='留言板'"></good-info>
                    </li>
                    <li class="position-r line-height-36 padding-left-40 margin-10 margin-bottom-20" v-else>
                        <div class=" padding-left-10 menu2"><i class="el-icon-plus color-ccc padding-right-5 bold"></i>{{item2.title}}</div>
                    </li>
                  </template>
                </ul>
                </transition>
            </li>
        </template>
            </ul>
        </li>
    </ul>
</div>
   
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
              a:false,
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
#side .menu:hover {background-color: rgba(0, 0, 0, 0.03);}
#side .menu2 {border: 2px dashed #D9DADC;}
#side .menu2:hover {border: 2px dashed #b2b2b2;}
</style>