<template>
  <div class="layout margin-10 margin-left-1">
      <ol class="breadbar">
        <li><a>{{constant.breadcrumb.headTitle}}</a></li>
        <template v-for="item in list">
          <li><a>{{item}}</a></li>
        </template>
      </ol>
      <div class="clear"></div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      url: '',
      google2: this.google,
      ArraySelected: this.selected,
    }
  }
}
</script>