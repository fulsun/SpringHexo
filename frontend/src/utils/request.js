import axios from 'axios';

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 自动读取对应环境的 URL
    timeout: 5000
})

export default service;