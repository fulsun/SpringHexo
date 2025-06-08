import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import {viteMockServe} from 'vite-plugin-mock'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import PurgeIcons from 'vite-plugin-purge-icons'

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, '../backend/src/main/resources/static/')
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [
                // 配置Element Plus采用saas样式配色系统
                ElementPlusResolver({importStyle: 'sass'}),
            ],
        }),
        Components({
            resolvers: [
                // 自动导入 Element Plus 组件
                ElementPlusResolver()
            ],
        }),
        createSvgIconsPlugin({
            // 指定图标文件夹
            iconDirs: [path.resolve(__dirname, './src/assets/svgs')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]',
            svgoOptions: true, // 传递给svgo的配置项
        }),
        viteMockServe({
            mockPath: 'mock', // mock文件存放目录
            localEnabled: true, // 开发环境启用
            prodEnabled: false, // 生产环境禁用
            logger: true, // 启用日志，方便调试
        }),
        PurgeIcons()
    ],
    css: {
        preprocessorOptions: {
            scss: {
                // 自动导入定制化样式文件进行样式覆盖
                additionalData: `@use "@/styles/element/index.scss" as *;`
            }
        }
    },
    devServer: {
        port: 3000, // 设置端口号
        // host: '0.0.0.0', // 允许外部访问
        // https: false, // 不启用HTTPS
        // open: true, // 启动时自动打开浏览器
        // hot: true, // 热更新
        proxy: {
            '/api2': {
                target: 'http://127.0.0.1:8080', // 目标服务器地址
                changeOrigin: true, // 允许跨域
                pathRewrite: {'^/api': ''} // 重写路径
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    }
})
