<template>
  <div class="layout">
    <el-upload
      class="avatar-uploader"
      :action="server+'?type='+id"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="layout margin-top-10 margin-bottom-10 color-ccc font-size-12"> 
       注 ：图片上传后保存修改才能生效 (普通用户无法操作！)
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    props:['id','type','data'],
    data() {
      return {
        filePath:global.filePath,
        imageUrl:'',
        server:global.UPSERVER,
      };
    },
    created: function() {
      if(this.data.image=='undefined'||this.data.image=="") {
        this.imageUrl='';
      }else{
        this.imageUrl=`${this.filePath}/${this.data.file}`;
      }
    },
    watch: {
        data(val) {
            if(this.data.image=='undefined'||this.data.image=="") {
              this.imageUrl='';
            }else{
              this.imageUrl=`${this.filePath}/${this.data.file}`;
            }
        }
      },
  
      computed: {
          ...mapState(['state']),
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.data.image=res.name;
        this.data.file=res.file;
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