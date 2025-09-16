import apiClient from '../apiClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createUser(userData: FormData) {
  const response = await apiClient.post(`users`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
  return response.data;
}

export async function updateAvatar(userId: string, file: File) {
  const formData = new FormData();
  formData.append('file', file); 

  const response = await apiClient.post(`/users/${userId}/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });

  return response.data;
}

export async function updateUser(userId: string, updateData: any) {
  const response = await apiClient.patch(`users/${userId}`, updateData);
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

export async function getUserLeavesBalance(userId: string) {
  const response = await apiClient.get(`users/balance/${userId}`);
  return response.data.data;
}





