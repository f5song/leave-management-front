export interface IUser {
    id: string;
    googleId: string;
    firstName: string;
    lastName: string;
    nickName: string;
    avatarUrl: string;
    birthDate: string;
    jobTitleId: string;
    departmentId: string;
    email: string;
    role: string; 
    permissions: string[];
  }

  export interface IBirthDay {
    id: string;
    firstName: string;
    lastName: string;
    nickName: string;
    birthDate: string;
  }