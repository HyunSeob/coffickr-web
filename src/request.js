import * as axios from 'axios';
import * as qs from 'qs';
import config from './config';

axios.defaults.baseURL = config.serverUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const instance = axios.create({
  paramsSerializer: (data) => qs.stringify(data),
  transformRequest: [(data) => qs.stringify(data)]
});

export default instance;