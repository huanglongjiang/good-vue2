 import Vue from 'vue';
import Router from 'vue-router';
import { generateRoutes } from './permission'
Vue.use(Router);

    let routes= [
        {
            path: '*', // 页面不存在的情况下会跳到404页面
            redirect: '/role',
            name: 'notFound',
            hidden: true
        },
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/login.vue'], resolve)
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                
                
                {
                    path: '/authority',
                    component: resolve => require(['../components/page/authority.vue'], resolve),
                    name: 'authority',
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/role',
                    name: 'role',
                    component: resolve => require(['../components/page/role.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                 
            ]
        }
        
        
    ]


    let routes2= [
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/index',
                    name: 'index',
                    component: resolve => require(['../components/page/index.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/log',
                    name: 'log',
                    component: resolve => require(['../components/page/log.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                
                {
                    path: '/keywords',
                    name: 'keywords',
                    component: resolve => require(['../components/page/keywords.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/user',
                    name: 'user',
                    component: resolve => require(['../components/page/user.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/adsense',
                    name: 'adsense',
                    component: resolve => require(['../components/page/adsense.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/link',
                    name: 'link',
                    component: resolve => require(['../components/page/link.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/system',
                    name: 'system',
                    component: resolve => require(['../components/page/system.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/copyright',
                    name: 'copyright',
                    component: resolve => require(['../components/page/copyright.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/index_seo',
                    name: 'index_seo',
                    component: resolve => require(['../components/page/index_seo.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/slider',
                    name: 'slider',
                    component: resolve => require(['../components/page/slider.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/article',
                    name: 'article',
                    component: resolve => require(['../components/page/article.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/article/action',
                    name: 'article_action',
                    component: resolve => require(['../components/page/article_action.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/root',
                    name: 'root',
                    component: resolve => require(['../components/page/root.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/tag',
                    name: 'tag',
                    component: resolve => require(['../components/page/tag.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                
               {
                    path: '/help',
                    name: 'help',
                    component: resolve => require(['../components/page/help.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/cnzz',
                    name: 'cnzz',
                    component: resolve => require(['../components/page/cnzz.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/bbs',
                    name: 'bbs',
                    component: resolve => require(['../components/page/bbs.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/authority',
                    component: resolve => require(['../components/page/authority.vue'], resolve),
                    name: 'authority',
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/role',
                    name: 'role',
                    component: resolve => require(['../components/page/role.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
               
            ]
        },
    ]
    let permission=localStorage.getItem('permission');
    if(permission!=null){
        let router=[...routes]
        let generateAsyncRoutes = generateRoutes(routes2, permission)  // 根据登录角色生成动态路由
        router = router.concat(generateAsyncRoutes)
        routes=[...router]
    }
export default new Router({
    routes
})
