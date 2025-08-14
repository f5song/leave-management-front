import apiClient from "../apiClient";
import { ILeaveInput } from "./Interface/leave.interface";


export const leaveService = {
 
  getRecentLeaves: async () => {
    const response = await apiClient.get('leaves/recent');
    return response.data;
  },

  requestLeave: async (leaveData: ILeaveInput) => {
    const response = await apiClient.post('leaves', leaveData);
    return response.data;
  }
};


export const createLeave = async (userId: string, data: ILeaveInput) => {
  try {
    const response = await apiClient.post(`leaves/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to create leave:', error);
    throw new Error('Failed to create leave');
  }
};

export const getLeaves = async (start?: string, end?: string) => {
  const queryParams = new URLSearchParams();

  if (start) queryParams.append("start", start);
  if (end) queryParams.append("end", end);

  const response = await apiClient.get(`leaves?${queryParams.toString()}`);

  return response.data;
};

export const getLeavesByUser = async (userId: string) => {
  const response = await apiClient.get(`leaves/user/${userId}`);

  return response.data;
};

export const updateLeaveStatus = async (
leaveId: string, newStatus: "APPROVED" | "REJECTED") => {
  const response = await apiClient.patch(`leaves/${leaveId}/status`, {
    status: newStatus
  });

  return response.data;
};

export const getPaginatedLeaves = async (page: number, limit: number) => {
  const response = await apiClient.get(`leaves/${page}/${limit}`);

  return response.data;
};

export type { ILeaveInput };

