// 获取菜单列表
import {get} from "@/http/index.js";

export const getMenuListApi = () => {
    return get("/api/menus", {})
};
