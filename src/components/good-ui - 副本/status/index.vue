<template>
  <div class="layout">
    <div class="layout container">
    <div class="switch" :class="{'a':val.status==1}" style="cursor:default">
      <span class="switch-label" data-on="on" data-off="off" style="cursor:default"></span>
      <span class="switch-handle" style="cursor:default"></span>
    </div>
  </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["val"],
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