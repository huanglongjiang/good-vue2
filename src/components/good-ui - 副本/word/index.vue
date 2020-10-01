<template>
<span class="padding-3 padding-left-10 padding-right-10 font-size-12 radius-20 color-primary bold" style="margin-right:5px; border:1px solid #ccc; background:#eee;">
    {{value}}
</span>
</template>

<script>
    export default {
      props: ["value"],
      data() {
          return {
             check:this.val,
          }
      },
      
    }
</script>