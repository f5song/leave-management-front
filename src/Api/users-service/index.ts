import apiClient from '../apiClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createUser(userData: FormData) {
  const response = await apiClient.post(`users`, userData);
  return response.data;
}


export async function updateUser(userId: string, updateData: any) {
  const response = await apiClient.put(`users/${userId}`, updateData);
  return response.data;
}

export async function getBirthdays() {
  const response = await apiClient.get(`users/birthdays`);
  return response.data.data;
}

export async function getUserById(userId: string) {
  const response = await apiClient.get(`users/${userId}`);
  return response.data.data;
}

export async function getUserLeaves(userId: string) {
  const response = await apiClient.get(`users/balance/${userId}`);
  return response.data.data;
}