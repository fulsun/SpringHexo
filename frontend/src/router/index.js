import {createRouter, createWebHistory} from 'vue-router'

const routes = [

    // 404 页面 - 必须放在最后
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/sys/error-page/404.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),   // 我们使用该模式可以去除 链接里边的#
    routes
})

export default router