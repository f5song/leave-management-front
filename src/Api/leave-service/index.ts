// services/leave-service.ts
import { ILeaveInput } from './Interface/leave.interface';
import axiosInstance from './axios-instance';

export const leaveService = {
  getLeaveBalance: async () => {
    return {
      sick: 8,
      personal: 5,
      vacation: 12,
    };
  },

  getLeaveRequests: async () => {
    return [
      {
        id: '1',
        type: 'ลาป่วย',
        startDate: '2025-01-15',
        endDate: '2025-01-16',
        days: 2,
        reason: 'ไข้หวัด',
        status: 'approved' as const,
      },
      {
        id: '2',
        type: 'ลากิจ',
        startDate: '2025-01-20',
        endDate: '2025-01-20',
        days: 1,
        reason: 'ธุระส่วนตัว',
        status: 'pending' as const,
      },
    ];
  },

  getRecentLeaves: async () => {
    const res = await axiosInstance.get('/leaves/recent');
    return res.data;
  },

  requestLeave: async (leaveData: ILeaveInput) => {
    const userId = localStorage.getItem('userId');
    const res = await axiosInstance.post(`/leaves/${userId}`, leaveData);
    return res.data;
  },

  getLeaves: async (start?: string, end?: string) => {
    const res = await axiosInstance.get('/leaves', {
      params: { start, end },
    });
    return res.data;
  },

  getLeavesByUser: async (userId: string, start?: string, end?: string) => {
    const res = await axiosInstance.get(`/leaves/user/${userId}`, {
      params: { start, end },
    });
    return res.data;
  },

  updateLeaveStatus: async (
    leaveId: string,
    newStatus: 'APPROVED' | 'REJECTED'
  ) => {
    const res = await axiosInstance.patch(`/leaves/${leaveId}/status`, {
      status: newStatus,
    });
    return res.data;
  },

  getPaginatedLeaves: async (page: number, limit: number) => {
    const res = await axiosInstance.get(`/leaves/${page}/${limit}`);
    return res.data;
  },
};

export type { ILeaveInput };
