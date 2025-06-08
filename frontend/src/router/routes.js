// 静态路由配置
const constantRoutes = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/",
        name: "Layout",
        component: () => import("@/layout/index.vue"),
        redirect: "/home",
        children: [
            {
                path: "home",
                name: "首页",
                component: () => import("@/views/home/index.vue"),
                meta: {
                    title: "首页",
                    icon: "mdi-light:home",
                }
            },
            {
                path: "posts",
                name: "文章管理",
                component: () => import("@/views/posts/index.vue"),
                meta: {
                    title: "文章管理",
                    icon: "material-symbols:edit-note",
                }
            }
        ],

    },

    // 404 页面 - 必须放在最后
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/sys/error-page/404.vue')
    }
];
export default [
    ...constantRoutes
]