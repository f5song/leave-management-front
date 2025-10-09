import { IUser } from "./user.interface";

export interface IAuthContextType {
    user: IUser | null;
    login: (user: IUser) => void;
    logout: () => void;
    isLoading: boolean;
    refreshUser: () => void;
  }
  