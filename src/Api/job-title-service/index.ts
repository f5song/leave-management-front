import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// services/job-title-service.ts
export const getJobTitles = async () => {
    const response = await axios.get(`${API_BASE_URL}/job-titles`);
    return response.data;
  };
