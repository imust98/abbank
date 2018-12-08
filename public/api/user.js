import request from '@/utils/request';
import {
  formatRestfulUrl
} from '@/utils/index';
//用户登出接口
export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  });
}
export function getList(data = {}) {
  return request({
    url:'/api/user/list',
    method: 'get'
  });
}

export function addUser(data = {}) {
  return request({
    url: '/api/user/add',
    method: 'post',
    data
  });
}
export function updateUser(data = {}) {
  return request({
    url: formatRestfulUrl('/api/user/:id', data.params),
    method: 'put',
    data:data.data
  });
}

export function deleteUser(data = {}) {
  return request({
    url: formatRestfulUrl('/api/user/:id', data.params),
    method: 'delete'
  });
}