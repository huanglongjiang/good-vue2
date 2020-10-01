<template>
    <div>
    <div class="font-size-36 color-eee align-center margin-top-50" v-if="data==null">
          
            <slot name="a">暂无数据......</slot>
        </div>
     <div class="layout width-max padding-10 background-white radius-3" style="box-shadow: 0 0px 1px 0 rgba(32, 33, 36, .28);" v-else>
        
        <slot></slot>
     </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["data"],
      data() {
          return {
             check:this.val,
          }
      },
      computed: {
            ...mapState(['state']),
      },
      
    }
</script>