export const Layout = () => import("@/layout/index.vue");

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
        component: Layout,
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: () => import("@/views/dashboard/index.vue"),
                meta: {
                    title: "工作台",
                    icon: "HomeFilled",
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