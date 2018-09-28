import axios from 'axios';
import {
  Message
} from 'element-ui';
import store from '@/store';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    const method = response.config.method;
    let msg = '';
    if (res.code == 200) {
      switch (method) {
        case 'post':
          msg = '创建成功';
          break;
        case 'delete':
          msg = '删除成功';
          break;
        default:
          msg = '修改成功';
          break;
      }
      const hmd = ['/api/channel/verify'];//包含这些接口的不用发提示
      const _isExist = hmd.some(item => {
        return response.config.url.indexOf(item) >= 0;
      })

      if (['post', 'delete', 'put'].includes(method) && !_isExist) {
        Message({
          message: msg,
          type: 'success',
          duration: 3 * 1000
        });
      }
    } else {
      msg = res.msg;
      Message({
        message: msg,
        type: 'error',
        duration: 3 * 1000
      });
    }

    return response;
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: 'Oh my God,服务端开小差了',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
