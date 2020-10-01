<template>
    <div>
        <div :id="id">
            <!--用来存放item-->
            <div :id="'fileList'+id" class="uploader-list"></div>
            <div :id="'filePicker'+id">选择图片</div>
             
        </div>
    </div>
</template>
<script>
// import WebUploader from '../../../static/webuploader-0.1.5/dist/webuploader'
//import swipebr from '../../../static/webuploader-0.1.5/examples/image-upload/getting-started'
    export default {
        data() {
            return {
                text:this.total,
                obj:{},
                imgName:'',
                type:this.id,
            }
        },
        props: ["total","id"],
       watch:{
        //'text': 'test',
       },
       computed:{
            filterTextarea: function () {
               this.text = this.total;
               return this.total;
            },
       },

        mounted:function(){
            var _this=this;
            var imgType=this.type;
            // 图片上传demo
            jQuery(function() {

                var $ = jQuery,
                    $list = $('#fileList' + _this.id),
                    // 优化retina, 在retina下这个值是2
                    ratio = window.devicePixelRatio || 1,

                    // 缩略图大小
                    thumbnailWidth = 100 * ratio,
                    thumbnailHeight = 100 * ratio,

                    // Web Uploader实例
                    uploader;

                // 初始化Web Uploader
                uploader = WebUploader.create({

                    // 自动上传。
                    auto: true,

                    // swf文件路径
                     swf: '../../../static/webuploader-0.1.5/dist/Uploader.swf',

                    // 文件接收服务端。
                    server:global.UPSERVER+"?type="+imgType,                   //服务器地址

                    // 选择文件的按钮。可选。
                    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                    pick: '#filePicker' + _this.id,

                    // 只允许选择文件，可选。
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/jpg,image/jpeg,image/png',
                        //mimeTypes: 'image/*'
                    },
                    formData: {  
                        type:imgType,
                    } 
                });

                // 当有文件添加进来的时候
                uploader.on( 'fileQueued', function( file ) {
                        
                        $list.html("");
                    var $li = $(
                            '<div id="' + file.id + '" class="file-item thumbnail">' +
                                '<img>' +
                                '<div class="info">' + file.name + '</div>' +
                            '</div>'
                            ),
                        $img = $li.find('img');

                    $list.append( $li );

                    // 创建缩略图
                    uploader.makeThumb( file, function( error, src ) {
                        if ( error ) {
                            $img.replaceWith('<span>不能预览</span>');
                            return;
                        }

                        $img.attr( 'src', src );
                    }, thumbnailWidth, thumbnailHeight );
                });

                // 文件上传过程中创建进度条实时显示。
                uploader.on( 'uploadProgress', function( file, percentage ) {

                    var $li = $( '#'+file.id ),
                        $percent = $li.find('.progress span');

                    // 避免重复创建
                    if ( !$percent.length ) {
                        $percent = $('<p class="progress"><span></span></p>')
                                .appendTo( $li )
                                .find('span');
                    }

                    $percent.css( 'width', percentage * 100 + '%' );
                });

                // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                uploader.on( 'uploadSuccess', function( file,response ) {
                    _this.imgName=response;

                    $( '#'+file.id ).addClass('upload-state-done');
                });

                // 文件上传失败，现实上传出错。
                uploader.on( 'uploadError', function( file ) {
                    var $li = $( '#'+file.id ),
                        $error = $li.find('div.error');

                    // 避免重复创建
                    if ( !$error.length ) {
                        $error = $('<div class="error"></div>').appendTo( $li );
                    }

                    $error.text('上传失败');
                });

                // 完成上传完了，成功或者失败，先删除进度条。
                uploader.on( 'uploadComplete', function( file ) {
                    $( '#'+file.id ).find('.progress').remove();
                });
            });
        },
        watch: {
            imgName() {

                if(this.imgName._raw.indexOf("result")==-1){
                    console.log(this.imgName._raw)
                    this.$emit('btnClick',this.imgName._raw);
                }
            },
        },
          destroyed(){
              this.$root.$off('btnClick');
          }
    }
</script>
<style>

  @import '../../../static/webuploader-0.1.5/css/webuploader.css';
    .swiper-container {
        width: 600px;
        height: 300px;
    }
    .progress-bar{height:10px;background:#ff6347;}
    .webuploader-container{display: inline-block; position: relative; top:0px;}
    .progress{ background: #ccc; border-radius: 5px; overflow: hidden;}
    .webuploader-container{height: 27px; }
    .webuploader-container>div{ height: 27px; line-height: 27px; }
    .webuploader-pick{ padding: 0px 10px; }
</style>
