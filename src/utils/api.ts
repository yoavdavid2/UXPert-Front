import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TOKEN_LS } from '../config';

const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_LS); 
};

const getAuthHeaders = (): { Authorization: string } | {} => {
  const token = getAccessToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};


export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const headers = getAuthHeaders();
  return axios.get<T>(url, { ...config, headers });
};


export const post = <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const headers = getAuthHeaders();
  return axios.post<T>(url, data, { ...config, headers });
};
