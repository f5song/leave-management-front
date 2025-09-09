import apiClient from "../apiClient";

export const getItemsStock = async () => {
  const response = await apiClient.get(`users-items`);
  return response.data;
};
