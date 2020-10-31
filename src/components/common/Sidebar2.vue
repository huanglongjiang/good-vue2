<template>
 <ul>
    <template v-for="(item,index) in data">

      <template v-if="item.children&&item.children.length==0">
      <li class="position-r line-height-36 padding-left-30 menu">
          <router-link active-class="a-link" :to="'/'+item.url" tag="span" class="margin-left-10 padding-left-30 pointer" data-module="log">
          <!-- <i class="padding-right-13 color-999 fa " :class="item.icon"></i> -->
          {{item.name}}
          </router-link>
          <good-info :data="state.log_total" v-if="item.name=='登录日志'"></good-info>
          <good-info :data="state.bbs_total" v-if="item.name=='留言板'"></good-info>

          <recursionchild :data="item.children"></recursionchild>
      </li>
      </template>
      <template v-else>
        <li class="position-r line-height-36 border-bottom-1 border-eee">
        <i class=" color-999 fa  padding-left-45" :class="item.icon"></i> 
          <span class="color-999 padding-left-5" data-module="log">
          {{item.name}}
          </span>
          <recursionchild :data="item.children"></recursionchild>
      </li>
      </template>
    </template>
    
</ul>
</template>
<script>
import { mapState } from 'vuex'
  export default {
    name: 'recursionchild',
    props:['data'] ,
    computed: {
            ...mapState(['state']),
        },
  }
</script>