import Vue from 'vue'
import Vuex from 'vuex'
import Path from 'path'
import axios from 'axios';
import Good from './../components/index.js'
Vue.use(Vuex)
Vue.use(Good)
Vue.prototype.$axios = axios;
const store = new Vuex.Store({
	// 定义状态
	state: {
        state: {
            counter:0,
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              },
            },
            webTitle:"good1230.com",
            headTitle:"个人博客日常笔记",
            marquee:"精简个人博客网站平台管理系统，售价 ￥150 元！有需要或想了解的朋友们请联系QQ：2970302840",
            authority:'',
            account:'',
            bbs_total:0,
            log_total:0,
            path:'',
            paramsType:0,
            paramsStatus:0,
            Imgpath:'dist/server/images/',
            //Imgpath:'../dist/server/images/',
            // 左侧导航
            menu:[
                {
                  title:'统计',
                  select:true,
                  icon:'fa fa-tachometer',
                  children:[
                    {title:'首页',select:true,url:'index'},
                    {title:'登录日志',select:false,url:'log'},
                  ]
                },
                {
                  title:'管理',
                  select:false,
                  icon:'fa fa-folder-open',
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
                  icon:'fa fa-windows',
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
                  icon:'fa fa-cogs',
                  children:[
                    {title:'首页SEO',select:false,url:'index_seo'},
                    {title:'版权信息',select:false,url:'copyright'},
                    {title:'常规选项',select:false,url:'system'},
                    // {title:'用户管理权限',select:false,url:'authority'},
                  ]
                },
            ]
            // 左侧导航

        },


	},
  mutations: {
    remove (state,item) {
      console.log(item)
      const options={
          type:"info",
          visible:true,
          msg:"此操作将永久删除该文件, 是否继续?",
          data:"操作成功",
      }
      console.log(Good)

      /*this.$hlj.confirm(options).then(res=>{
          const data={
              "google":item.coding,
              "operating":"delete",
              "id":item.id,
          }
          this.$axios.post(global.APIPATH,data).then(res => {
              if(res.status==200){
                  const options={
                      type:"success",
                      message:res.data.result,
                  }
                  this.$hlj.message(options)
                  this.dataList(); 
              }       
          })
      })*/
    }
  },
  actions: {
    remove (context,item) {
      context.commit('remove',item)
    }
  }
})
export default store