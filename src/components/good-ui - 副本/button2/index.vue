<template>
     <a class="pointer margin-right-10 border-default border-1 width-25 height-25 line-height-25 align-center bold font-size-12 inline-block radius-30 background-white color-ccc" @click="a()">
       <slot></slot>
     </a>
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
      methods: {
        a(item){
          this.$emit("click")
        },
      }
      
    }
</script>