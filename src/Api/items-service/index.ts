import apiClient from "../apiClient";

export const getItemsStock = async (
  page?: number,
  limit?: number,
  itemStatus?: string
) => {
  const response = await apiClient.get('users-items', {
    params: { page, limit, itemStatus },
  });
  return response.data.data; // { data: [...], pagination: {...} }
};
