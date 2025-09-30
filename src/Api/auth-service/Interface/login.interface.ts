// src/services/authService/interfaces.ts

export interface ILoginResponse {
    access_token: string;
    user: {
      id: string;
      name: string;
      email: string;
      googleId: string;
      avatarUrl: string;
      role: string;
      firstName: string;
      lastName: string;
      departmentId: string;
      jobTitleId: string;
      nickName: string;
      birthDate: string;
      permissions: string[];
    };
  }