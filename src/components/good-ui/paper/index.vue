<template>
<!-- <div class="height-25 line-height-25 padding-left-5 padding-right-5 position-a right-0 top-0 color-white font-size-12" :class="background">
  <slot></slot>
</div> -->
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