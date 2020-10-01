<template>
     <div class="layout">
      <i class="fa fa-toggle-on font-size-24 color-on" v-if="item.status==1"></i>
      <i class="fa fa-toggle-off font-size-24 color-off" v-if="item.status==0"></i>
     </div>
</template>

<script>
    export default {
      props: ["item"],
      data() {
          return {
             check:this.val,
          }
      },
    }
</script>