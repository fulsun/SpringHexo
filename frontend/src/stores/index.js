import {createPinia, defineStore} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import piniaPersistConfig from "@/config/piniaPersist";


export const GlobalStore = defineStore('GlobalState', {
    state: () => {
        return {token: "",}
    },
    actions: {
        setToken(token) {
            this.token = token;
        }
    },
    persist: piniaPersistConfig("GlobalState"),
})

// piniaPersist(持久化) 默认存储位置：localStorage
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
