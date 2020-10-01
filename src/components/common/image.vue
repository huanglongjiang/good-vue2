<template>
     <div class="layout">
     <!-- 判断头像上传 -->
     <template v-if="type=='user'">
            <template v-if="form.image!=''">
                <div class="border-3 padding-10 inline-block background-white width-140" style="border:2px dashed #eee; min-height:140px;">
                    <img :src="state.Imgpath+'user/'+form.image" alt="" class="width-120 height-auto block">
                </div>
            </template>
            <template v-else>
                <div class="border-3 padding-10 inline-block background-white width-140 height-auto" style="border:2px dashed #eee; min-height:140px;">
                    <img src="static/images/image.png" alt="" class="width-120 height-auto block">
                </div>
            </template>
     </template>
     <!-- tag标签 -->
     <template v-if="type=='article_title'">
            <template v-if="form.image!=''">
                <div class="border-3 padding-10 inline-block background-white width-140" style="border:2px dashed #eee; min-height:140px; ">
                    <img :src="state.Imgpath+'article_title/'+form.image" alt="" class="width-120 height-auto block">
                </div>
            </template>
            <template v-else>
                <div class="border-3 padding-10 inline-block background-white width-140 height-auto" style="border:2px dashed #eee; min-height:140px;">
                    <img src="static/images/image.png" alt="" class="width-120 height-auto block">
                </div>
            </template>
     </template>
     <!-- 广告 -->
     <template v-if="type=='adsense'">
            <template v-if="form.image!=''">
                <div class="border-3 padding-10 inline-block background-white width-140" style="border:2px dashed #eee; min-height:140px;">
                    <img :src="state.Imgpath+'adsense/'+form.image" alt="" class="width-120 height-auto block">

                </div>
                <div class="color-ccc">图片地址：{{state.Imgpath}}adsense/{{form.image}}</div>
            </template>
            <template v-else>
                <div class="border-3 padding-10 inline-block background-white width-140 height-auto" style="border:2px dashed #eee; min-height:140px;">
                    <img src="static/images/image.png" alt="" class="width-120 height-auto block">
                </div>
            </template>
     </template>
     <!-- 幻灯片 -->
     <template v-if="type=='slider'">
            <template v-if="form.image!=''">
                <div class="border-3 padding-10 inline-block background-white width-140" style="border:2px dashed #eee; min-height:140px;">
                    <img :src="state.Imgpath+'slider/'+form.image" alt="" class="width-120 height-auto block">
                </div>
            </template>
            <template v-else>
                <div class="border-3 padding-10 inline-block background-white width-140 height-auto" style="border:2px dashed #eee; min-height:140px;">
                    <img src="static/images/image.png" alt="" class="width-120 height-auto block">
                </div>
            </template>
     </template>
     <!-- 常规选项 -->
     <template v-if="type=='logo'">
            <template v-if="form.logo!=''">
                <div class="border-3 padding-10 inline-block background-white width-140" style="border:2px dashed #eee; min-height:140px;">
                    <img :src="state.Imgpath+'logo/'+form.logo" alt="" class="width-120 height-auto block">
                </div>
            </template>
            <template v-else>
                <div class="border-3 padding-10 inline-block background-white width-140 height-auto" style="border:2px dashed #eee; min-height:140px;">
                    <img src="static/images/image.png" alt="" class="width-120 height-auto block">
                </div>
            </template>
     </template>
     <!-- 文章中心 -->
     <template v-if="type=='article'">
            <template v-if="form.image!=''">
                <div class="border-3 padding-10 inline-block background-white width-140" style="border:2px dashed #eee min-height:140px;">
                    <img :src="state.Imgpath+'article/'+form.image" alt="" class="width-120 height-auto block">
                </div>
            </template>
            <template v-else>
                <div class="border-3 padding-10 inline-block background-white width-140 height-auto" style="border:2px dashed #eee; min-height:140px;">
                    <img src="static/images/image.png" alt="" class="width-120 height-auto block">
                </div>
            </template>
     </template>
     <!-- 图集中心 -->
     <template v-if="type=='picture'">
            <template v-if="form.image!=''">
                <div class="border-3 padding-10 inline-block background-white width-140" style="border:2px dashed #ddd">
                    <img :src="state.Imgpath+'picture/'+form.image" alt="" class="width-120 height-auto block">
                </div>
            </template>
            <template v-else>
                <div class="border-3 padding-10 inline-block background-white width-140 height-auto" style="border:2px dashed #eee; min-height:140px;">
                    <img src="static/images/image.png" alt="" class="width-120 height-auto block">
                </div>
            </template>
     </template>
        
        <div class="layout margin-bottom-10 color-ccc font-size-14"> 
           注 ：图片上传后保存修改才能生效 (普通用户无法操作！)
        </div>
     </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      props: ["type","form"],
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