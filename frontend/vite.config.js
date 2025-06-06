import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, '../backend/src/main/resources/static/')
    },
    plugins: [vue()],
    devServer: {
        port: 3000, // 设置端口号
        // host: '0.0.0.0', // 允许外部访问
        // https: false, // 不启用HTTPS
        // open: true, // 启动时自动打开浏览器
        // hot: true, // 热更新
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080', // 目标服务器地址
                changeOrigin: true, // 允许跨域
                pathRewrite: {'^/api': ''} // 重写路径
            }
        }
    },
})
