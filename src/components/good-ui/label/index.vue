<template>
     <span class="color-white padding-5 padding-left-8 padding-right-8 radius-20 font-size-12" :class="background" style="box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);">
      <slot></slot>
     </span>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["background"],
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