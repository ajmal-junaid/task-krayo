import axios from 'axios';
import {baseUrl} from './constants';

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(
            localStorage.getItem("userToken")
        )}`
    }
});
instance.interceptors.request.use((config) => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    if (userToken) {
      config.headers.authorization = `Bearer ${userToken}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export default instance;