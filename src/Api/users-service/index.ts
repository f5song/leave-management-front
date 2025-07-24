import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createUser(userData: FormData) {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
}


export async function updateUser(userId: string, updateData: any, token: string) {
  const response = await axios.put(`${API_BASE_URL}/users/${userId}`, updateData, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getBirthdays() {
  const response = await axios.get(`${API_BASE_URL}/users/birthdays`);
  return response.data.data;
}