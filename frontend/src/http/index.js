import axios from "axios";
import {GlobalStore} from "@/stores/index.js";
import router from "@/router/index.js";
import {checkStatus} from "@/http/status/index.js";


const config = {
    // 默认地址请求地址
    baseURL: import.meta.env.VITE_API_BASE_URL, // 设置超时时间 单位毫秒
    timeout: 30000, // 跨域时候允许携带凭证
    headers: {
        'Content-Type': 'application/json', // 强制使用 JSON
    }, withCredentials: true,
};

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 自动读取对应环境的 URL
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到pending中
    // 在发送请求之前做些什么
    const globalStore = GlobalStore();
    const token = globalStore.token;
    if (config.headers && typeof config.headers.set === "function") {
        config.headers.set("x-access-token", token);
        return config;
    }
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(response => {
    removePending(response.config) // 在请求结束后，移除本次请求
    // 对响应数据做点什么

    const {data} = response;
    const globalStore = GlobalStore();
    if (data.code === 401) {
        // 未登录状态下 跳转登录页面
        ElMessage.error("登录失效，请重新登录");
        globalStore.setToken("");
        router.push("/login");
    }
    return data;
}, error => {
    if (axios.isCancel(error)) {
        console.log('repeated request: ' + error.message)
    } else {
        const {response} = error;
        // 尝试获取后端返回的错误信息
        if (response && response.data && response.data.error) {
            ElMessage.error(response.data.error);
        } else {
            // 请求超时 && 网络错误单独判断，没有 response
            if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
            if (error.message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
            // 根据响应的错误状态码，做不同的处理
            if (response) checkStatus(response.status);
            // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
            if (!window.navigator.onLine) router.replace("/500");
        }
    }
    return Promise.reject(error);
});

// 常用请求方法封装
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export function post(url, data) {
    return new Promise((resolve, reject) => {
        service.post(url, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export function put(url, data) {
    return new Promise((resolve, reject) => {
        service.put(url, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function del(url, params) {
    return new Promise((resolve, reject) => {
        service.delete(url, {
            params: params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

const pendingMap = new Map()

/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config) {
    const {url, method, params, data} = config
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config) {
    const pendingKey = getPendingKey(config)
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingKey)) {
            pendingMap.set(pendingKey, cancel)
        }
    })
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
    const pendingKey = getPendingKey(config)
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey)
        cancelToken(pendingKey)
        pendingMap.delete(pendingKey)
    }
}


export default service;