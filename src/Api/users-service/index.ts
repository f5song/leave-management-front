import apiClient from '../apiClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createUser(userData: FormData) {
  const response = await apiClient.post(`users`, userData);
  return response.data;
}


export async function updateUser(userId: string, updateData: any) {
  console.log("📡 API update payload:", updateData);
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

export async function getUserLeaves(userId: string) {
  const response = await apiClient.get(`users/balance/${userId}`);
  return response.data.data;
}

// Api function
export async function updateAvatar(userId: string, file: File) {
  const formData = new FormData();
  formData.append('file', file); // ชื่อ 'file' ต้องตรงกับ Multer

  const response = await apiClient.post(`/users/${userId}/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Axios จะตั้งให้เองก็ได้
    },
  });

  return response.data;
}




