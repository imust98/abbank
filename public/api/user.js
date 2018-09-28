import request from '@/utils/request';
//用户登出接口
export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  });
}