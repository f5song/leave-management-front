import apiClient from "../apiClient";
import { ILeaveInput } from "./Interface/leave.interface";


export const createLeave = async (userId: string, data: ILeaveInput) => {
  try {
    const response = await apiClient.post(`leaves/${userId}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create leave');
  }
};

export const getLeavesByUser = async (userId: string) => {
  const response = await apiClient.get(`leaves/user/${userId}`);

  return response.data.data;
};

export const updateLeaveStatus = async (
  leaveId: string, newStatus: "APPROVED" | "REJECTED") => {
  const response = await apiClient.patch(`leaves/${leaveId}/status`, {
    status: newStatus
  });

  return response.data;
};

export const getLeaves = async (
  page?: number,
  limit?: number,
  userId?: string,
  status?: string
) => {
  const params = new URLSearchParams();

  params.append("page", page?.toString() || "1");
  params.append("limit", limit?.toString() || "9");

  if (userId) params.append("userId", userId);
  if (status) params.append("status", status);

  const response = await apiClient.get(`/leaves?${params.toString()}`);
  return response.data.data;
};

export const getAllLeaves = async () => {
  const response = await apiClient.get(`/leaves`);
  return response.data.data;
};

export const getLeaveType = async () => {
  const response = await apiClient.get(`/leave-types`);
  return response.data.data;
};


export type { ILeaveInput };

