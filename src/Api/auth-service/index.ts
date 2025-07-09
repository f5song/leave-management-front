import apiClient from '@/Api/apiClient';
import { IGoogleLoginResponse } from './Interface/google.interface';
import { ILoginResponse } from './Interface/login.interface';
// import {ILoginResponse, IGoogleLoginResponse} from './interfaces';

export const authService = {
  async login(credentials: { email: string; password: string }): Promise<ILoginResponse> {
    const { data } = await apiClient.post<ILoginResponse>('/auth/login', credentials);

    if (data.access_token) {
      localStorage.setItem('authToken', data.access_token);
    }

    return data;
  },

  async googleLogin(code: string): Promise<IGoogleLoginResponse> {
    const { data } = await apiClient.post<IGoogleLoginResponse>('/auth/google-login', { code });
    if (data.access_token) {
      localStorage.setItem('authToken', data.access_token);
    }
    return data;
  },

  async getCurrentUser() {
    const { data } = await apiClient.get('/auth/profile');
    return data;
  },

  logout() {
    localStorage.removeItem('authToken');
  },
};
