const config = require('@config');
//export const API = 'http://app-dev.fitspotapp.com/api/v1';
export const API = config.apiUrl;
//console.log(config);
class ApiUtils {
  static post(url, body) {
    //console.log(url);
    //console.log(body);
    return this.callURL(url, body,'post', null);
  }

  static postFile(url, body, fileObject) {
    return this.callURLWithForm(url, body, 'post', fileObject);
  }

  static delete(url) {
    return this.callURL(url, null, 'delete', null);
  }

  static get(url, body){
    return this.callURL(url, body, 'get', null);
  }

  static get(url) {
    return this.callURLNoBody(url,'get');
  }

  static patch(url, body) {
    return this.callURL(url, body, 'PATCH', null);
  }

  static callURL(url, body, method, fileObject) {
    //console.log(method + ": " + url);
    //console.log(body);
    return fetch(`${API}/${url}`, {
      method: method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => {
      return Promise.all([Promise.resolve(response), response.json()]);
    });
  }

  static callURLNoBody(url,method){
    //console.log(method + ": " + url);
    return fetch(`${API}/${url}`, {
      method: method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      return Promise.all([Promise.resolve(response), response.json()]);
    })
  }

  static callURLWithForm(url,body,method,fileObject){
    let data = new FormData()
    data.append('file', {uri: 'file://' + fileObject.uri, name: 'image.jpg', type: 'image/jpg'})

    return fetch(`${API}/${url}`, {
      method: method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
      },
      body: data
    }).then((response) => {
      return Promise.all([Promise.resolve(response), response.json()]);
    })
  }

  static parseJsonAsQueryString(obj){
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
  }



}

export default ApiUtils
