<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.log" />
        <good-menu>
            <good-total class="float-right" :total='init.total'></good-total>
        </good-menu>
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th>访客头像</th>
                            <th>账号(匿名)</th>
                            <th>邮箱</th>
                            <th>登录账号</th>
                            <th>用户角色</th>
                            <th>来源IP</th>
                            <th>操作类型</th>
                            <th>登录日期</th>
                            <th>操作结果</th>
                        </tr>
                    </thead>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                        <tr>
                            <td>
                                <div class="line-height-30 padding-3">
                                    <template v-if="item.file!=''">
                                    <img :src="filePath+'/'+item.file" alt="" class="width-30 height-30 radius-20 block" v-if="item.file.length>7">
                                    <img :src="'http://www.good1230.com/good/RandomUser/'+item.file" alt="" class="width-30 height-30 radius-20 block" v-else>
                                </template>
                                <template v-else>
                                    <img src="static/images/tianmao.jpg" alt="" class="width-30 height-30 radius-20 block">
                                </template>
                                </div>
                            </td>
                            <td><span>{{item.account}} <span class="color-999">({{item.name}})</span></span></td>
                            <td><span>{{item.email}}</span></td>
                            <td><span>{{item.loginType}}</span></td>
                            <td>
                                <good-label background="background-one" v-if="item.role==0">普通用户</good-label>
                                <good-label background="background-two" v-if="item.role==1">管理员</good-label>
                                <good-label background="background-three" v-if="item.role==2">超级管理员</good-label>
                            </td>
                            <td>{{item.ip}}</td>
                            <td>{{item.type}}</td>
                            <td>{{item.time}}</td>
                            <td class="color-ccc">{{item.result}}</td>
                        </tr>
                       </template>
                    </tbody>
                </table> 
            </div>
        </good-box>
        <good-pagination :page.sync="init"></good-pagination>
    </good-page>
</template>

<script>
    export default {
        data: function(){
            return {
                filePath:global.filePath,
                list:'',
                google:"t-10001",
                init:{
                    pagesize:10,
                    page:0 ,
                    total:0,
                    currentPage1:1,
                },
            }
        },
        created: function() {
            this.dataList();
        },
        watch: {
            'init.page': 'dataList',
            'init.pagesize': 'dataList',
        },
        methods: {
            dataList(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                    "pagesize":this.init.pagesize,
                    "page":this.init.page,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.list=res.data.data;
                    this.init.total=res.data.total;
                })
            },
     
        },
    }
</script>