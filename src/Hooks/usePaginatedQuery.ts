import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { defaultPaginatedData } from "@/Shared/utils/defaults";
import { IPaginatedResponse } from "@/Interfaces/hooks.interface";
import { IUser } from "@/Interfaces/user.interface";

interface UsePaginatedQueryProps<T> {
  queryKeyBase: string;
  fetchFn: (page: number, limit: number, status?: string) => Promise<IPaginatedResponse<T>>;
  user?: IUser;
  isLoading?: boolean;
  limit?: number;
}

export const usePaginatedQuery = <T>({
  queryKeyBase,
  fetchFn,
  user,
  isLoading = false,
  limit = 9,
}: UsePaginatedQueryProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const queryKey = [queryKeyBase, currentPage, selectedStatus];

  const itemsQuery = useQuery({
    queryKey,
    queryFn: async () => {
      if (!user || isLoading) return defaultPaginatedData<T>(currentPage, limit);
      const response = await fetchFn(currentPage, limit, selectedStatus ?? undefined);
      return response;
    },
    enabled: !!user && !isLoading,
  });

  const handleTabClick = (status: string) => {
    setSelectedStatus((prev) => (prev === status ? null : status));
    setCurrentPage(1);
  };

  return {
    data: itemsQuery.data?.data || [],
    pagination: itemsQuery.data?.pagination || { totalItems: 0, totalPages: 1, page: currentPage, limit },
    isLoading: itemsQuery.isLoading,
    currentPage,
    setCurrentPage,
    selectedStatus,
    handleTabClick,
  };
};
