// services/department-service.ts
import apiClient from "../apiClient";

export const getDepartments = async () => {
  const response = await apiClient.get(`departments`);
  return response.data.data;
};

