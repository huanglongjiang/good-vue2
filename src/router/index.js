import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
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
                    path: '/log',
                    component: resolve => require(['../components/page/log.vue'], resolve)
                },
                {
                    path: '/seo',
                    component: resolve => require(['../components/page/seo.vue'], resolve)
                },
                {
                    path: '/seo_tag',
                    component: resolve => require(['../components/page/seo_tag.vue'], resolve)
                },
                {
                    path: '/keywords',
                    component: resolve => require(['../components/page/keywords.vue'], resolve)
                },
                {
                    path: '/report',
                    component: resolve => require(['../components/page/report.vue'], resolve)
                },
                {
                    path: '/install',
                    component: resolve => require(['../components/page/install.vue'], resolve)
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/user.vue'], resolve)
                },
                {
                    path: '/adsense',
                    component: resolve => require(['../components/page/adsense.vue'], resolve)
                },
                {
                    path: '/link',
                    component: resolve => require(['../components/page/link.vue'], resolve)
                },
                {
                    path: '/money',
                    component: resolve => require(['../components/page/money.vue'], resolve)
                },
                {
                    path: '/system',
                    component: resolve => require(['../components/page/system.vue'], resolve)
                },
                {
                    path: '/copyright',
                    component: resolve => require(['../components/page/copyright.vue'], resolve)
                },
                {
                    path: '/index_seo',
                    component: resolve => require(['../components/page/index_seo.vue'], resolve)
                },
                {
                    path: '/slider',
                    component: resolve => require(['../components/page/slider.vue'], resolve)
                },
                {
                    path: '/article',
                    component: resolve => require(['../components/page/article.vue'], resolve)
                },
                {
                    path: '/root',
                    component: resolve => require(['../components/page/root.vue'], resolve)
                },
                {
                    path: '/tag',
                    component: resolve => require(['../components/page/tag.vue'], resolve)
                },
                {
                    path: '/article_action',
                    component: resolve => require(['../components/page/article_action.vue'], resolve)
                },
               {
                    path: '/cnzz',
                    component: resolve => require(['../components/page/cnzz.vue'], resolve)
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/user.vue'], resolve)
                },
                {
                    path: '/help',
                    component: resolve => require(['../components/page/help.vue'], resolve)
                },
                {
                    path: '/file',
                    component: resolve => require(['../components/page/file.vue'], resolve)
                },
                {
                    path: '/job',
                    component: resolve => require(['../components/page/job.vue'], resolve)
                },
                {
                    path: '/bbs',
                    component: resolve => require(['../components/page/bbs.vue'], resolve)
                },
                {
                    path: '/music',
                    component: resolve => require(['../components/page/music.vue'], resolve)
                },
                {
                    path: '/html',
                    component: resolve => require(['../components/page/html.vue'], resolve)
                },
                {
                    path: '/picture',
                    component: resolve => require(['../components/page/picture.vue'], resolve)
                },
                {
                    path: '/authority',
                    component: resolve => require(['../components/page/authority.vue'], resolve)
                },
          
               
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/login.vue'], resolve)
        },
    ]
})
