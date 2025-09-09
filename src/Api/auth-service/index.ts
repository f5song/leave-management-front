import apiClient from '@/Api/apiClient';
import { IGoogleLoginResponse } from './Interface/google.interface';
import { ILoginResponse } from './Interface/login.interface';
import { string } from 'zod';
import Cookies from 'js-cookie';

export const authService = {
  async login(credentials: { email: string; password: string }): Promise<ILoginResponse> {
    const { data } = await apiClient.post<ILoginResponse>('/auth/login', credentials);

    if (data.access_token) {
      Cookies.set("authToken", data.access_token, { path: "/" }); // path ชัดเจน
    }

    return data;
  },

  async googleLogin(code: string): Promise<IGoogleLoginResponse> {
    const { data } = await apiClient.post<IGoogleLoginResponse>('/auth/google-login', { code });
    if (data.access_token) {
      Cookies.set("authToken", data.access_token, { path: "/" }); // path ชัดเจน
    }
    return data;
  },

  async getCurrentUser() {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },

  async logout() {
    const { data } = await apiClient.post('/auth/logout');
    return data;
  },

  async checkAuth() {
    const { data } = await apiClient.get('/auth/check');
    return data;
  },

};
