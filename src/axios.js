import axios from "axios";
import {toast} from '@/composables/util.js'
import { getToken } from '@/composables/auth.js'
const service = axios.create({
  baseURL: "/api",
});
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    const token = getToken()
    if(token){
        config.headers['token'] = token
    }
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    return response.request.responseType == 'blob' ?  response.data : response.data.data;
  },
  function (error) {
    toast(error.response.data.msg || "请求失败",'error')
    
    return Promise.reject(error);
  }
);

export default service;
