import apiClient from '../apiClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createUser(userData: FormData) {
  const response = await apiClient.post(`${API_BASE_URL}/users`, userData);
  return response.data;
}


export async function updateUser(userId: string, updateData: any) {
  const response = await apiClient.put(`${API_BASE_URL}/users/${userId}`, updateData);
  return response.data;
}

export async function getBirthdays() {
  const response = await apiClient.get(`${API_BASE_URL}/users/birthdays`);
  return response.data.data;
}

export async function getUserById(userId: string) {
  const response = await apiClient.get(`${API_BASE_URL}/users/${userId}`);
  return response.data.data;
}