import {createRouter, createWebHistory} from 'vue-router'

const routes = []

const router = createRouter({
    history: createWebHistory(),   // 我们使用该模式可以去除 链接里边的#
    routes
})

export default router