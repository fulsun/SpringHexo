import {post} from "@/http";

/**
 * 登录模块
 */
// 用户登录
export const loginApi = (params) => {
    return post("/api/login", JSON.stringify(params));
};