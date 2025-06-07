import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router'; // 导入路由配置
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'animate.css';
import '@/styles/index.scss' // 导入全局样式文件
import 'virtual:svg-icons-register' // 导入svg组件
import pinia from "@/stores/index"; // 导入pinia


const app = createApp(App);
// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router); // 挂载路由
app.use(pinia);
app.mount('#app');
