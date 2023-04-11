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

export default instance;