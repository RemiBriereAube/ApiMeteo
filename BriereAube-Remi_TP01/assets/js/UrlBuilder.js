export default class UrlBuilder {
  static getUrl(url, params) {
    return url + "?" + this._getEncodeParams(params);
  }

  static _getEncodeParams(params) {
    let encodeParams = [];
      
    for (const prop in params) {
        encodeParams.push(encodeURIComponent(prop) + "=" + encodeURIComponent(params[prop]));
      }
      
      return encodeParams.join("&");
    }
  }