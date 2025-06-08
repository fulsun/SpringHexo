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
    }),
    actions: {
        setToken(token) {
            this.token = token;
        },
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
    },
    persist: piniaPersistConfig("GlobalState"),
})

// piniaPersist(持久化) 默认存储位置：localStorage
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
