<template>
<div>
<div class="layout width-220 height-max border-primary position-a left-0 top-0 bottom-0 z-index-10" style="box-sizing:border-box;">
    <div class="layout width-max height-60 line-height-60" style="">
      <!-- <good-logo></good-logo> -->
      <!-- <i class="fa fa-yelp"></i> -->
      <!-- <span class="color-999 float-left font-size-24 bold padding-left-30 padding-right-30" title="退出平台系统">{{constant.webTitle}}</span> -->
    </div>

    <ul id="side" class="padding-30 padding-left-50">
      <template v-for="(item,index) in state.menu">
        <li class="font-size-14">
                <div class="title color-333" @click="open(item,index)">
                    <i class="margin-right-10 color-999" :class="item.icon"></i>{{item.title}}
                    
                </div>
               <transition name="bounceM">
                              
                <ul class="position-r overflow-hidden padding-left-15 margin-top-10 margin-bottom-10" >
                  <template v-for="(item2,index2) in item.children">
                    <li class="position-r line-height-36">
                        <router-link active-class="a-link" :to="'/'+item2.url" tag="span" class="margin-left-10 pointer" data-module="log"  @click.native="select(item2,item.children)">{{item2.title}}</router-link>
                          <good-info :data="state.log_total" v-if="item2.title=='登录日志'"></good-info>
                          <good-info :data="state.bbs_total" v-if="item2.title=='留言板'"></good-info>
                        
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