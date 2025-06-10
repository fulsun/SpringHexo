import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router'; // 导入路由配置
import 'animate.css';
import '@/styles/index.scss' // 导入全局样式文件
import 'virtual:svg-icons-register' // 导入svg组件
import pinia from "@/stores/index"; // 导入pinia
import Icon from './components/Icon.vue'
import {registerIcons} from "./config/icon.config.js"; // 新增导入
// 注册本地图标集（关键步骤）
registerIcons();

const app = createApp(App);
// 全局注册Icon组件
app.component('Icon', Icon)
app.use(router); // 挂载路由
app.use(pinia);
app.mount('#app');
