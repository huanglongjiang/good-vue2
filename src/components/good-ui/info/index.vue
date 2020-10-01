<template>
     <span class="padding-1 padding-left-5 padding-right-5 radius-30 background-danger font-size-12" style="color:white">{{data}}</span>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["data"],
      data() {
          return {}
      },
      computed: {
            ...mapState(['state']),
      },
      
    }
</script>