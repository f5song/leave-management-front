
// Auth API service functions
// Replace these URLs with your actual API endpoints

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  async login(credentials: { email: string; password: string }) {
    console.log('Calling login API with:', credentials);

    const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
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


  async googleLogin(idToken: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }), 
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('authToken', data.access_token);
      }

      return {
        googleId: data.googleId,
        user: data.user,
        token: data.access_token,
        isNewUser: data.isNewUser,
        email: data.email,
        avatarUrl: data.avatarUrl,
      };
    } catch (err) {
      throw new Error('Google login failed');
    }
  },

  async getCurrentUser() {
    const token = localStorage.getItem('authToken');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log("response", response);
    console.log("token", token);

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
  },

};
