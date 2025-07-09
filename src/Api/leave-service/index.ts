import { useQueryClient } from "@tanstack/react-query";
import { ILeaveInput } from "./Interface/leave.interface";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const leaveService = {
  getLeaveBalance: async () => {
    // Mock data for leave balance
    return {
      sick: 8,
      personal: 5,
      vacation: 12
    };
  },

  getLeaveRequests: async () => {
    // Mock data for leave requests
    return [
      {
        id: '1',
        type: 'ลาป่วย',
        startDate: '2025-01-15',
        endDate: '2025-01-16',
        days: 2,
        reason: 'ไข้หวัด',
        status: 'approved' as const
      },
      {
        id: '2',
        type: 'ลากิจ',
        startDate: '2025-01-20',
        endDate: '2025-01-20',
        days: 1,
        reason: 'ธุระส่วนตัว',
        status: 'pending' as const
      }
    ];
  },

  getRecentLeaves: async () => {
    // Mock data for recent leaves
    return [];
  },

  requestLeave: async (leaveData: ILeaveInput) => {
    // Mock API call
    console.log('Leave request:', leaveData);
    return { success: true, id: Date.now().toString() };
  }
};



export const createLeave = async (userId: string, data: ILeaveInput) => {
  const response = await fetch(`${API_BASE_URL}/leaves/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create leave");
  }

  return response.json();
};

export const getLeaves = async (start?: string, end?: string) => {
  const queryParams = new URLSearchParams();

  if (start) queryParams.append("start", start);
  if (end) queryParams.append("end", end);

  const response = await fetch(`${API_BASE_URL}/leaves?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leaves");
  }

  return response.json();
};

export const getLeavesByUser = async (userId: string, start?: string, end?: string) => {
  const queryParams = new URLSearchParams();

  if (start) queryParams.append("start", start);
  if (end) queryParams.append("end", end);

  const response = await fetch(`${API_BASE_URL}/leaves/user/${userId}?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leaves");
  }

  return response.json();
};

export const updateLeaveStatus = async (
  token: string,
  leaveId: string,
  newStatus: "APPROVED" | "REJECTED"
) => {
  console.log("🚀 ~ updateLeaveStatus ~ newStatus:", newStatus)
  console.log("🚀 ~ updateLeaveStatus ~ leaveId:", leaveId)
  console.log("🚀 ~ updateLeaveStatus ~ token:", token)
  const response = await fetch(`${API_BASE_URL}/leaves/${leaveId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Failed to update leave status");
  }

  return await response.json(); // หรือไม่ก็ return void ถ้า backend ไม่ส่งกลับ
};
export type { ILeaveInput };

