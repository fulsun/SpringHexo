import {createPinia, defineStore} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import piniaPersistConfig from "@/config/piniaPersist";
import router from "@/router/index";


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
        removeTabs(tabPath, isCurrent = true) {
            const tabsMenuList = this.tabsMenuList;
            if (isCurrent) {
                // 如果删除的标签页是当前激活的标签页，则激活上一个标签页
                tabsMenuList.forEach((item, index) => {
                    if (item.path !== tabPath) return;
                    const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
                    if (!nextTab) return;
                    router.push(nextTab.path);
                });
            }
            //从列表中删除标签页
            this.tabsMenuList = tabsMenuList.filter((item) => item.path !== tabPath);
            // 全部标签页关闭时，清空标签页列表
            if (this.tabsMenuList.length === 0) {
                router.push("/"); // 跳转到首页
            }
        }
    },
    persist: piniaPersistConfig("GlobalState"),
});

// piniaPersist(持久化) 默认存储位置：localStorage
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
