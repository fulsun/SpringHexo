import {createPinia, defineStore} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import piniaPersistConfig from "@/config/piniaPersist";


export const GlobalStore = defineStore('GlobalState', {
    state: () => ({
        token: '',
        themeConfig: {
            // 折叠菜单
            isCollapse: false,
        },
        userInfo: {
            avatar: "",
            username: "",
        },
        tabsMenuList: [], // 标签菜单列表
    }),
    actions: {
        setToken(token) {
            this.token = token;
        },
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
        addTabs(tabItem) {
            // 如果标签页列表中不存在该标签页，则添加

            if (!this.tabsMenuList.some(item => item.path === tabItem.path)) {
                this.tabsMenuList.push(tabItem);
            }
        },
    },
    persist: piniaPersistConfig("GlobalState"),
});

// piniaPersist(持久化) 默认存储位置：localStorage
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
