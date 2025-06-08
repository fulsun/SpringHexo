import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import {viteMockServe} from 'vite-plugin-mock'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import Icons from 'unplugin-icons/vite'
import IconsResolver from "unplugin-icons/resolver";


// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, 'dist')
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
                ElementPlusResolver(),
                // 自动导入 Iconify 图标
                IconsResolver()
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
        Icons({
            compiler: 'vue3',
            autoInstall: true, // 自动安装图标集（按需）
            // 关键配置：启用运行时图标加载
            runtimeCompiler: true,
            scale: 1, // 缩放比例
            defaultClass: 'iconify', // 默认类名
        })
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
