<template>
	<td class="color-default" style="background: #f6f8f9;">
	    <span v-if="page[0].page==0">{{page[0].total-page[1]}}</span>
	    <span v-else>{{page[0].total-(page[0].page*page[0].pagesize+page[1])}}</span>
	</td>
</template>

<script>
    export default {
      props: ["page"],
    }
</script>