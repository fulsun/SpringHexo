import http from "@/http";

/**
 * 登录模块
 */
// 用户登录
export const loginApi = (params) => {
    return http.post("/api/login", JSON.stringify(params));
};