import axios from 'axios';

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 自动读取对应环境的 URL
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求前做些什么，例如添加 token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 成功时提取响应结果中的data
        return response.data.data;
    },
    error => {
        // 对响应错误做些什么
        if (error.response.status === 401) {
            // 处理未授权
        }
        return Promise.reject(error);
    }
);

export default service;