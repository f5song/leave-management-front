import apiClient from "../apiClient";

export const getJobTitles = async () => {
    const response = await apiClient.get(`job-titles`);
    return response.data.data;
  };
