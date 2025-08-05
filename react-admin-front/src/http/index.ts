import axios from 'axios';
import { EnvConfig } from '@/enums/env';
import store from '@/store';
import { selectAccessToken } from '@/store/user';

const instance = axios.create({
  baseURL: import.meta.env[EnvConfig.BASE_URL],
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const accessToken = selectAccessToken(store.getState());

    // 在请求头中添加Authorization字段
    if (accessToken) {
      config.headers.setAuthorization(`Bearer ${accessToken}`);
    }
    // console.log('-----', config, `Bearer ${accessToken}`);

    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log('Response error:', error);

    return Promise.reject(error);
  },
);

export default instance;

interface Response<Data = any> {
  code: number;
  status: number;
  message: string;
  data: Data;
}

export function post<Data = any>(url: string, params: any) {
  return instance.post<unknown, Response<Data>>(url, params);
}

export function get<D = any>(url: string, params: any) {
  return instance.get<unknown, Response<D>>(url, {
    params: params,
  });
}
