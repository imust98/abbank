import request from '@/utils/request';
import {
  formatRestfulUrl,
  hasProperty
} from '@/utils/index';

export function getList(data = {}) {
  let url = '/api/person/list?';
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

export function getPerson(data = {}) {
  return request({
    url: formatRestfulUrl('/api/person/:id',data.params),
    method: 'get'
  });
}
export function addPerson(data = {}) {
  return request({
    url: '/api/person/add',
    method: 'post',
    data
  });
}
export function addPersonCredit(data){
  return request({
    url: formatRestfulUrl('/api/person/credit/:id',data.params),
    method: 'post',
    data:data.data
  });
}
export function deletePerson(data = {}) {
  return request({
    url: formatRestfulUrl('/api/person/delete/:id', data.params),
    method: 'delete'
  });
}

export function modifyPerson(data = {}) {
  return request({
    url: formatRestfulUrl('/api/person/:id', data.params),
    method: 'put',
    data: data.data
  });
}