
// Leave API service functions
// Replace these URLs with your actual API endpoints

const API_BASE_URL = 'https://your-api-domain.com/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const leaveService = {
  async getLeaveBalance() {
    console.log('Fetching leave balance...');
    
    // Mock data for now
    // Replace with actual API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          sick: 8,
          personal: 5,
          vacation: 12
        });
      }, 1000);
    });
    
    /*
    const response = await fetch(`${API_BASE_URL}/leave/balance`, {
      headers: getAuthHeader(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch leave balance');
    }
    
    return response.json();
    */
  },

  async getRecentLeaves() {
    console.log('Fetching recent leaves...');
    
    // Mock data for now
    // Replace with actual API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            type: 'ลาป่วย',
            date: '15-20 ม.ค. 2025',
            status: 'approved'
          },
          {
            id: 2,
            type: 'ลากิจ',
            date: '10 ม.ค. 2025',
            status: 'pending'
          }
        ]);
      }, 1000);
    });
    
    /*
    const response = await fetch(`${API_BASE_URL}/leave/recent`, {
      headers: getAuthHeader(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch recent leaves');
    }
    
    return response.json();
    */
  },

  async requestLeave(leaveData: {
    type: string;
    startDate: string;
    endDate: string;
    reason: string;
  }) {
    console.log('Requesting leave:', leaveData);
    
    const response = await fetch(`${API_BASE_URL}/leave/request`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(leaveData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to request leave');
    }
    
    return response.json();
  }
};
