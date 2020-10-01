<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.html" />
        <div class="layout clearfix">

            <good-button class="float-left margin-right-10" icon="fa-spinner" @click="Submit_index('index')">首页更新</good-button>
            <good-button class="float-left margin-right-10" icon="fa-spinner" @click="Submit_tag('tag')">栏目页更新</good-button>
            <good-button class="float-left margin-right-10" icon="fa-spinner" @click="Submit_detail('detail')">内容页更新</good-button>
        </div>
            <template v-if="state.authority==2">
                <div class="layout margin-top-20">
                    <td><good-input v-model="data.count"></good-input></td>
                </div>
                <div class="layout">
                    <td><good-input v-model="data.count2"></good-input></td>
                </div>
                <template v-if="data.total!=0">
                    <div class="align-center margin-top-50 font-size-24 color-999">共 <span class="color-red bold">{{data.total}}</span> 条数据</div>
                    <div class="align-center margin-top-50 font-size-24 color-999">已更新 <span class="color-red bold">{{data.count}}</span> 条数据</div>
                </template>
                <div class="align-center margin-top-50 font-size-24 color-999">{{data.result}}</div>
            </template>
        


    </good-page>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data: function(){
            return {
                result:0,
                google:"t-10019",
                text:"",
                data:{
                    result:'',
                    total:0,
                    count:0,
                    count2:20,
                },
                count:0,
            }
        },
        computed: {
            ...mapState(['state']),
        },
        methods: {

            Submit_index(operating){
                let data={
                    "google":this.google,
                    "operating":operating,
                    "count":this.data.count,
                    "count2":this.data.count2,
                } 
                this.$axios.post(global.APIPATH,data).then(res => {   
                    
                    const options={
                        type:"success",
                        message:res.data.result,
                    }
                    this.$hlj.message(options)
                    this.data.result='首页更新完成';
                });
            },

            Submit_tag(operating){
                let data={
                    "google":this.google,
                    "operating":operating,
                    "count":Number.parseInt(this.data.count),
                    "count2":Number.parseInt(this.data.count2),
                } 
                this.count++
                this.data.result=`正在第${this.count}次更新栏目页...`;
                this.$axios.post(global.APIPATH,data).then(res => {  
                    this.data=res.data
                    if(this.data.count+this.data.count2<this.data.total){

                        this.data.result=`第${this.count}次更新栏目页完成-...`;
                        this.data.count+=this.data.count2;
                        setTimeout(()=>{
                            this.Submit_tag('tag')
                        },5000)
                        
                    }else{
                        debugger
                        if(res.data.count===undefined){
                            const options={
                                type:"success",
                                message:res.data.result,
                            }
                            this.$hlj.message(options)
                        }else{
                            const options={
                                type:"success",
                                message:'栏目页全部更新完成',
                            }
                            this.$hlj.message(options)
                            this.data.count=this.data.total;
                            this.data.result='栏目页全部更新完成'
                        }
                    }
                });
            },

            Submit_detail(operating){
                let data={
                    "google":this.google,
                    "operating":operating,
                    "count":Number.parseInt(this.data.count),
                    "count2":Number.parseInt(this.data.count2),
                } 
                this.count++
                this.data.result=`正在第${this.count}次更新详情页...`;
                this.$axios.post(global.APIPATH,data).then(res => {    
                    this.data=res.data
                    if(this.data.count+this.data.count2<this.data.total){

                        this.data.result=`第${this.count}次更新详情页完成-...`;
                        this.data.count+=this.data.count2;
                        setTimeout(()=>{
                            this.Submit_detail('detail')
                        },5000)
                        
                    }else{
                        if(res.data.count===undefined){
                            const options={
                                type:"success",
                                message:res.data.result,
                            }
                            this.$hlj.message(options)
                        }else{
                            const options={
                                type:"success",
                                message:'详情页全部更新完成',
                            }
                            this.$hlj.message(options)
                            this.data.count=this.data.total;
                            this.data.result='详情页全部更新完成'
                        }
                    }
                });
            },
     
        },
    }
</script>
