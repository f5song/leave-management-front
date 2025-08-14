import apiClient from "../apiClient";

export const getItemsRequestByUser = async (userId: string) => {
  const response = await apiClient.get(`users-items-requests/user/${userId}`);
  console.log(response.data);
  return response.data;
};
