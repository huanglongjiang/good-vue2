import Vue from 'vue'
import Vuex from 'vuex'
import Path from 'path'
import axios from 'axios';
Vue.use(Vuex)
const initData={
	counter:0,
  authority:0,

	// 网站名称
	webTitle:"good1230.com",

	// QQ
	qq:"tencent://message/?uin=2970302840",

	// 面包屑
	breadcrumb:{
		headTitle:'个人博客记录生活点点滴滴',
		index:['首页'],
    log:['登录日志'],
		root:['栏目中心'],
		tag:['标签中心'],
		keywords:['关键词库'],
		article:['文章中心'],
		user:['用户管理'],
		link:['友情链接'],
		adsense:['广告管理'],
		slider:['图片轮播'],
		bbs:['留言板'],
		help:['客服信息'],
		cnzz:['站长统计'],
		html:['页面静态化'],
		index_seo:['首页SEO'],
		copyright:['版权信息'],
		system:['常规选项'],
    role:['角色权限'],
    authority:['菜单设置'],
		// authority:['用户管理权限'],
	},
	// 面包屑

	// 筛选项
	filter:{
		article:{
			status:['默认','优质','热门','推荐'],
		},
		link:{
			type:['友情链接','友情链接2','全站链接','合作伙伴','服务结束'],
			status:['关闭','开启'],
		},
		user:{
			type:['普通用户','管理员','超级管理员'],
			status:['冻结','正常'],
		},
		adsense:{
			status:['服务结束','服务中'],
		},
		slider:{
      type:['通用轮播图','首页轮播图','栏目页轮播图','内容页轮播图'],
      status:['关闭','开启'],
    },
    help:{
      type:['咨询客服','技术客服','售后客服'],
      status:['关闭','开启'],
    },
	},
	// 筛选项

	// 左侧导航
	menu:[
        {
          title:'统计',
          select:true,
          children:[{title:'登录日志',select:false,url:'log'}]
        },
        {
          title:'管理',
          select:false,
          children:[
            {title:'栏目中心',select:false,url:'root'},
            {title:'标签中心',select:false,url:'tag'},
            {title:'关键词库',select:false,url:'keywords'},
            {title:'文章中心',select:false,url:'article'},
            {title:'用户管理',select:false,url:'user'},
            {title:'友情链接',select:false,url:'link'},
            {title:'广告管理',select:false,url:'adsense'},
            {title:'图片轮播',select:false,url:'slider'},
          ]
        },
        {
          title:'功能',
          select:false,
          children:[
            {title:'留言板',select:false,url:'bbs'},
            {title:'客服信息',select:false,url:'help'},
            {title:'站长统计',select:false,url:'cnzz'},
            // {title:'页面静态化',select:false,url:'html'},
          ]
        },
        {
          title:'设置',
          select:false,
          children:[
            {title:'首页SEO',select:false,url:'index_seo'},
            {title:'版权信息',select:false,url:'copyright'},
            {title:'常规选项',select:false,url:'system'},
            // {title:'用户管理权限',select:false,url:'authority'},
          ]
        },
    ],
    // 左侧导航
    data: [{
      id: 1,
      label: '统计',
      children: [{
        id: 4,
        label: '登录日志',
      }]
    }, {
      id: 2,
      label: '管理',
      children: [{
        id: 5,
        label: '栏目中心',
        children: [{
	        id: 40,
	        label: '新增栏目',
	      },
	      {
	        id: 40,
	        label: '编辑栏目',
	      }]
      }, {
        id: 6,
        label: '标签中心'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }],
}

export default initData