export interface IGoogleLoginResponse {
    googleId: string;
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
      birthDate: Date;
      permissions: string[];
    };
    access_token: string;
    isNewUser: boolean;
    email: string;
    avatarUrl: string;
  }
  