<template>
     <div class="layout">
      <h3>默认模式</h3>
        <form>
            <textarea name="content" style="width:800px;height:400px;visibility:hidden;">KindEditor</textarea>
            <p>
                <input type="button" name="getHtml" value="取得HTML" />
                <input type="button" name="isEmpty" value="判断是否为空" />
                <input type="button" name="getText" value="取得文本(包含img,embed)" />
                <input type="button" name="selectedHtml" value="取得选中HTML" />
                <br />
                <br />
                <input type="button" name="setHtml" value="设置HTML" />
                <input type="button" name="setText" value="设置文本" />
                <input type="button" name="insertHtml" value="插入HTML" />
                <input type="button" name="appendHtml" value="添加HTML" />
                <input type="button" name="clear" value="清空内容" />
                <input type="reset" name="reset" value="Reset" />
            </p>
        </form>

     </div>
</template>

<script>
var editor;
import kindeditor from '../../../static/kindeditor-4.1.10/kindeditor'
import zh_CN from '../../../static/kindeditor-4.1.10/lang/zh_CN'
    export default {
        data() {
            return {s
                text:this.total,
            }
        },
        props: ["total"],
       watch:{
        //'text': 'test',  
       },
       computed:{
           
       },
       
        mounted:function(){
            this.init();         
        },
        methods:{
           init(){
            console.log(1)
                
                // KindEditor.ready(function(K) {
                //     console.log(32);
                    KindEditor.basePath = '../static/kindeditor-4.1.10/';
                    editor = KindEditor.create('textarea[name="content"]', {
                        allowFileManager : true
                    });
                    $('input[name=getHtml]').click(function(e) {
                        alert(editor.html());
                    });
                // });
            },
        }
    }
</script>
<style scoped>
    .swiper-container {
        width: 600px;
        height: 300px;
    }  
</style>