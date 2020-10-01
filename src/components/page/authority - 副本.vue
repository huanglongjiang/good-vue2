<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <breadBar :list="constant.breadcrumb.authority" />
        <div class="layout width-max padding-left-10 padding-right-10">
            <div class="table-data" style="margin:0px">
                <table class="table-group  panel-5 line-height-30">
                    <thead class="block-header">
                    <thead class="block-header">
                        <tr>
                            <th>用户角色/功能操作</th>
                            <th>查询</th>
                            <th>新增</th>
                            <th>编辑</th>
                            <th>删除</th>
                        </tr>
                    </thead>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in ['超级管理员','管理员','普通用户']">
                        <tr>
                            <td>{{item}}</td>
                            <td>
                                <img src="static/ico/check-icon.png" alt="" class="width-20" v-if="index==0">
                                <img src="static/ico/check-icon.png" alt="" class="width-20" v-if="index==1">
                                <img src="static/ico/check-icon.png" alt="" class="width-20" v-if="index==2">
                            </td>
                            <td>
                                <img src="static/ico/check-icon.png" alt="" class="width-20" v-if="index==0">
                                <img src="static/ico/error-icon.png" alt="" class="width-20" v-if="index==1">
                                <img src="static/ico/error-icon.png" alt="" class="width-20" v-if="index==2">
                            </td>
                            <td>
                                <img src="static/ico/check-icon.png" alt="" class="width-20" v-if="index==0">
                                <img src="static/ico/error-icon.png" alt="" class="width-20" v-if="index==1">
                                <img src="static/ico/error-icon.png" alt="" class="width-20" v-if="index==2">
                            </td>
                            <td>
                                <img src="static/ico/check-icon.png" alt="" class="width-20" v-if="index==0">
                                <img src="static/ico/error-icon.png" alt="" class="width-20" v-if="index==1">
                                <img src="static/ico/error-icon.png" alt="" class="width-20" v-if="index==2">
                            </td>
                        </tr>
                       </template>
                    </tbody>
                </table> 
            </div>
        </div>
        <div class="layout padding-10 color-ccc">
            注：管理其他用户信息表
        </div>
    </div>
</template>