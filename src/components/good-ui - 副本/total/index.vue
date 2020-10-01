<template>
<div class="color-ccc line-height-30 margin-right-20 font-size-14">
    共<span class="color-primary padding-left-5 padding-right-5 bold">{{total}}</span>条数据
</div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["total","float"],
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