import axios from 'axios';
import { IHoliday } from './interfaces/holidays.interface';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getHolidays = async (): Promise<IHoliday[]> => {
  const response = await axios.get(`${API_BASE_URL}/holidays`);
  return response.data.data;
};
