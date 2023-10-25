import axios from 'axios';
import {API_TIMEOUT, BASE_URL} from '../common/constants';

export const mainAxios: any = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

// Use request and response interceptors if needed
