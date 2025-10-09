import { IUser } from "@/Interfaces/user.interface";

export interface PaginationQueryParams {
  page?: number;
  limit?: number;
  filter?: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

export interface QueryHookParams extends PaginationQueryParams {
  user?: IUser | null;
  isLoading?: boolean;
}
