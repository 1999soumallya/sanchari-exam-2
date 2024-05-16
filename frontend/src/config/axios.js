import Axios from 'axios';
import { getCookie } from '../helper/cookiesHelper';

const axios = Axios.create({ baseURL: 'http://127.0.0.1:3100' })

axios.interceptors.request.use(config => {
    const token = getCookie('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

export default axios;