
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

  requestLeave: async (leaveData: {
    type: string;
    startDate: string;
    endDate: string;
    reason: string;
  }) => {
    // Mock API call
    console.log('Leave request:', leaveData);
    return { success: true, id: Date.now().toString() };
  }
};
