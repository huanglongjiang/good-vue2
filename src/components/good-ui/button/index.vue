<template>
     <div class="button button-primary button-md font-size-14" :class="'button-'+type" @click="a()">
       <template v-if="icon"><i class="button-ico fa" :class="{'fa-plus-square':icon}">
       </i></template>
       <slot></slot>
     </div>

     
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["icon","float","type"],
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