import {createRouter, createWebHistory} from 'vue-router'
import routes from './routes'
import {getToken} from '@/utils/auth' // 假设从本地存储获取 token


const router = createRouter({
    history: createWebHistory(),   // 我们使用该模式可以去除 链接里边的#
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    const whiteList = ['/login', '/404']
    if (getToken()) { // 已登录
        if (to.path === '/login') {
            next('/') // 重定向到首页
        } else {
            next() // 放行
        }
    } else { // 未登录
        if (whiteList.includes(to.path)) {
            next() // 放行
        } else {
            next('/login') // 重定向到登录页
        }
    }
});
export default router