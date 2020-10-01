<template>
  <div class="layout">
  {{forms}}
    <el-upload
      class="avatar-uploader"
      :action="server"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-upload
      class="avatar-uploader"
      :action="server"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    props:['id','type','data'],
    data() {
      return {
        aaa:'',
        forms:this.data,
        imageUrl:'',
        server:global.UPSERVER,
      };
    },
    mounted() {
      //this.imageUrl=this.$store.state.state.Imgpath+'article'+this.forms.logo;
      console.log(this.imageUrl)
      console.log(this.form)
    },
    watch: {
        data(val) {
        this.$nextTick(() => {
            this.forms=val;
            this.imageUrl=this.$store.state.state.Imgpath+this.type+'/'+this.data.logo;
          });
        }
      },
  
      computed: {
          ...mapState(['state']),
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.aaa=file
       //this.data.logo=res.
       console.log(file)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    background: #fff;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>