import {defineStore} from "pinia";
import {getMenuListApi} from "@/http/modules/menu";

export const useMenuStore = defineStore("MenuStore", {
    state: () => ({
        menuList: [], // 菜单列表
    }),
    getters: {
        authMenuList: (state) => state.menuList,
    },
    actions: {
        async getMenuList() {
            const response = await getMenuListApi();
            const {data} = response;
            this.menuList = data.menu
        },
    },
});