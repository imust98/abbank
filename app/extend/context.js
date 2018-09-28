function httpRequest(method) {
  return async function (url,params) {
    const result = await this.curl(url, {
      method: method,
      dataType: 'json',
      contentType: 'json',
      ...params
    });
    if(!(result.status+'').match(/^2/)){
      throw new Error(result.data.message)
    } else {
      return {
        code:result.status,
        msg:'',
        result:result.data
      }
    }
  }
}
module.exports = {
  async httpGet(url, params = {}) {
    const request = httpRequest('GET').bind(this);
    return request(url,params);
  },
  async httpPost(url, params = {}) {
    const request = httpRequest('POST').bind(this);
    return request(url,params);
  },
  async httpDelete(url, params = {}) {
    const request = httpRequest('DELETE').bind(this);
    return request(url,params);
  },
  async httpPut(url, params = {}) {
    const request = httpRequest('PUT').bind(this);
    return request(url,params);
  },
  async httpPatch(url, params = {}) {
    const request = httpRequest('PATCH').bind(this);
    return request(url,params);
  }
}
