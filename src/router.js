import Vue from 'vue';
import Router from 'vue-router';

import About from '@/pages/About';
import Home from '@/pages/Home';
import Load from '@/pages/Load';
import Login from '@/pages/Login'
import ChangePassword from "@/pages/ChangePassword";
import Register from "@/pages/Register";
import Sex from "@/pages/Sex";
import TimeLine from "@/pages/TimeLine";
import MapAlbum from "@/pages/MapAlbum";
import UserInfo from "@/pages/UserInfo";
import CreateAlbum from "@/pages/CreateAlbum";
import Classify from "@/pages/Classify";
import Album from "@/pages/Album";
import Privacy from '@/pages/Privacy';
import LoginPrivacy from '@/pages/LoginPrivacy';
import ATPhotos from "@/pages/ATPhotos";
import SharePage from '@/pages/SharePage';
import FacePage from "@/pages/FacePage";
import Face from "@/pages/Face";
import ClassifyPage from "@/pages/ClassifyPage";



Vue.use(Router);


const routes = [
        {
            path: '/',
            component: Home,
            meta: {
                title: '',
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
            children:[
                {
                    path:'/',
                    component: TimeLine
                },
                {
                    path: '/load',
                    name: '下载/上传',
                    component: Load,
                },
                {
                    path: '/sex',
                    component: Sex
                },
                {
                    path: '/privacy',
                    component: Privacy
                },
                {
                    path: "/loginPrivacy",
                    component: LoginPrivacy
                },
                {
                    path: '/about',
                    component: About
                },
                {
                    path: '/info',
                    component: UserInfo
                },
                {
                    path: '/map',
                    component: MapAlbum
                },
                {
                    path: '/changePwd/:index',
                    name:'ChangePassword',
                    component: ChangePassword
                },
                {
                    path: '/classify',
                    component: Classify
                },
                {
                    path: '/classifyPhoto/:name',
                    name:'ClassifyPhoto',
                    component: ClassifyPage
                },
                {
                    path: '/create',
                    component: CreateAlbum
                },
                {
                    path:'/album',
                    component: Album,

                },
                {
                    name: 'AlbumPhoto',
                    path:'albumPhoto/:name',
                    component: ATPhotos,
                },
                {
                    name:'MapPhoto',
                    path:'mapPhoto/:name',
                    component: ATPhotos,
                },
                {
                    name:'FacePage',
                    path:'facePage',
                    component: FacePage
                },
                {
                    name:'Face',
                    path:'face/:id',
                    component:Face
                }


            ]

        },
        {
            path:'/login',
            component: Login
        },

        {
            path:'/register',
            component: Register
        },
        {
            path:'/share/:id',
            component: SharePage,
        }
    ];


const router = new Router({
    mode:'history',
    routes
});

// if (window.localStorage.getItem('Authorization')) {
//     store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }

router.beforeEach((to, form, next) =>{
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (window.localStorage.getItem('Authorization')) {
            //console.log(window.localStorage.getItem('Authorization'));
            next();
        } else {
            next({
                path: '/login',
                // //登陆成功后跳转至该路由
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});

export default router;

