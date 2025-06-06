const {defineConfig} = require('@vue/cli-service')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = defineConfig({
    publicPath: './',
    outputDir: 'dist',
    transpileDependencies: true,
    devServer: {
        host: '0.0.0.0', // 允许外部访问
        port: 8080, // 设置端口号
        https: false, // 不启用HTTPS
        open: true, // 启动时自动打开浏览器
        hot: true, // 热更新
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080', // 目标服务器地址
                changeOrigin: true, // 允许跨域
                pathRewrite: { '^/api': '' } // 重写路径
            },
            '/auth': {
                target: 'http://auth.example.com',
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        plugins: [new CleanWebpackPlugin()]
    }
})
