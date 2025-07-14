// services/department-service.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getDepartments = async () => {
  const response = await axios.get(`${API_BASE_URL}/departments`);
  return response.data;
};

