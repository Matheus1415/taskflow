import { LocalStorageWrapper } from '@/utils/LocalStorage';
import axios from 'axios'

export const Api =  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json'
    }
})

Api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = LocalStorageWrapper.get('auth_token');
    
    if (token) {

      // Adiciona o token no header Authorization (Bearer token)
      config.headers = config.headers ?? {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Caso dê erro na requisição
    return Promise.reject(error);
  }
);