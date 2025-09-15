import apiClient from "../apiClient";

export const getItemsRequest = async (page?: number, limit?: number,userId?: string, status?: string) => {
  const params = new URLSearchParams();

  params.append("page", page?.toString() || "1");
  params.append("limit", limit?.toString() || "9");

  if (userId) params.append("userId", userId);
  if (status) params.append("status", status);

  const response = await apiClient.get(`users-items-requests?${params.toString()}`);
  return response.data.data;
};
