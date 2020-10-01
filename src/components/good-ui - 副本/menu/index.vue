<template>
  <div class="layout margin-top-10 margin-bottom-10 clearfix">
    <slot></slot>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["item"],
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