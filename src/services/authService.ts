
// Auth API service functions
// Replace these URLs with your actual API endpoints

const API_BASE_URL = 'https://your-api-domain.com/api';

export const authService = {
  async login(credentials: { email: string; password: string }) {
    console.log('Calling login API with:', credentials);
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  },

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    department: string;
    position: string;
    googleId?: string | null;
    avatar?: string | null;
  }) {
    console.log('Calling register API with:', userData);
    
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  },

  async googleLogin() {
    console.log('Initiating Google login...');
    
    // This is a mock implementation
    // In real implementation, you would use Google OAuth2
    // For now, we'll simulate the flow
    
    try {
      // Simulate Google OAuth response
      const mockGoogleData = {
        id: 'google_123456789',
        email: 'user@gmail.com',
        name: 'John Doe',
        picture: 'https://example.com/avatar.jpg'
      };
      
      // Check if user exists in your system
      const response = await fetch(`${API_BASE_URL}/auth/google-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ googleId: mockGoogleData.id }),
      });
      
      const data = await response.json();
      
      if (data.userExists) {
        // User exists, log them in
        const loginResponse = await fetch(`${API_BASE_URL}/auth/google-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ googleId: mockGoogleData.id }),
        });
        
        const loginData = await loginResponse.json();
        
        if (loginData.token) {
          localStorage.setItem('authToken', loginData.token);
        }
        
        return {
          isNewUser: false,
          user: loginData.user,
          token: loginData.token
        };
      } else {
        // New user, redirect to registration
        return {
          isNewUser: true,
          googleData: mockGoogleData
        };
      }
    } catch (error) {
      throw new Error('Google login failed');
    }
  },

  async getCurrentUser() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        throw new Error('Token expired');
      }
      throw new Error('Failed to get user');
    }
    
    return response.json();
  },

  logout() {
    localStorage.removeItem('authToken');
  }
};
