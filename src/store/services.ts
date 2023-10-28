import axios from 'axios';
import {API_TIMEOUT, BASE_URL} from '../common/constants';

export const mainAxios = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

// Axios request and response interceptors can be used if needed
