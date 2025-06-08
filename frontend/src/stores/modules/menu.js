import {defineStore} from "pinia";
import {getMenuListApi} from "@/http/modules/menu";
import {getAllBreadcrumbList} from "@/utils/utils";

export const useMenuStore = defineStore("MenuStore", {
    state: () => ({
        menuList: [], // 菜单列表
    }),
    getters: {
        // 菜单列表扁平化后的数组
        authMenuList: (state) => state.menuList,
        // 所有面包屑导航列表
        breadcrumbList: (state) => getAllBreadcrumbList(state.menuList),

    },
    actions: {
        async getMenuList() {
            const response = await getMenuListApi();
            const {data} = response;
            this.menuList = data.menu
        },
    },
    persist: true
});