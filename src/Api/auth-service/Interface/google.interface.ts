export interface IGoogleLoginResponse {
    googleId: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    access_token: string;
    isNewUser: boolean;
    email: string;
    avatarUrl: string;
  }
  