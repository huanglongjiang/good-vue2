<template>
     <td class="width-100 align-right color-default height-50 font-size-12">
        <span class="color-star font-size-12" v-if="typeof(star)==='string'">
            <slot></slot>
        </span>
        <template v-if="typeof(star)==='undefined'">
          <span class=" font-size-12">
            <slot></slot>
          </span>
        </template>
     </td>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["star"],
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