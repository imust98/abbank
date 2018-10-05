import request from '@/utils/request';
import {
  formatRestfulUrl,
  hasProperty
} from '@/utils/index';

export function getList(data = {}) {
  let url = '/api/company/list?';
  if (hasProperty(data)) {
    const params = [];
    for (let key in data) {
      params.push(key + '=' + data[key])
    }
    url = url + params.join('&');
  }

  return request({
    url,
    method: 'get'
  });
}

export function getCompany(data = {}) {
  return request({
    url: formatRestfulUrl('/api/company/:id',data.params),
    method: 'get'
  });
}
export function addCompany(data = {}) {
  return request({
    url: '/api/company/add',
    method: 'post',
    data
  });
}
export function addCompanyCredit(data){
  return request({
    url: formatRestfulUrl('/api/company/credit/:id',data.params),
    method: 'post',
    data:data.data
  });
}
export function deleteCompany(data = {}) {
  return request({
    url: formatRestfulUrl('/api/company/delete/:id', data.params),
    method: 'delete'
  });
}

export function modifyCompany(data = {}) {
  return request({
    url: formatRestfulUrl('/api/company/:id', data.params),
    method: 'put',
    data: data.data
  });
}