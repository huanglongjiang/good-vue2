<template>
 <div class="layout border-default background-white" style="border-bottom:0px;">
        <div class="tag-group border-0">
          <span class="tag-type margin-left-10 inline-block width-100 align-right color-ccc">{{tagName}}：</span>
          <a class="tag-block" :class="{'tag-primary':selected2===''}" @click="tag('')">全部</a>
            <template v-for="(item,index) in list">
              <template v-if="json">
                <a class="tag-block" :class="{'tag-primary':item.id===selected2}" @click="tag(item.id)">{{item.name}}</a>
              </template>
              <template v-else>
                <a class="tag-block" :class="{'tag-primary':index===selected2}" @click="tag(index)">{{item}}</a>
              </template>
            </template>
        </div>
  </div> 
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["tagName","list",'selected','json'],
      data() {
          return {
            selected2:this.selected,
          }
      },
      created: function() {
        
        
      },
      computed: {
            ...mapState(['state']),
      },
      watch: {
        random(){
            this.google2=this.google;
        },
      },
      methods:{
        tag(index){
          this.selected2=index
          this.$emit('update:selected',this.selected2); 
        },
      }
    }
</script>