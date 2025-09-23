import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type UsePaginatedQueryProps<T> = {
  queryKeyBase: string;
  fetchFn: (page: number, limit: number, status?: string) => Promise<{ data: T[]; pagination: any }>;
  limit?: number;
  user?: any;
};

export const usePaginatedQuery = <T>({
  queryKeyBase,
  fetchFn,
  limit = 9,
  user,
}: UsePaginatedQueryProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const queryKey = [queryKeyBase, currentPage, selectedStatus];

  const { data = { data: [], pagination: { totalItems: 0, totalPages: 1, page: 1, limit } }, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => fetchFn(currentPage, limit, selectedStatus ?? undefined),
    placeholderData: { data: [], pagination: { totalItems: 0, totalPages: 1, page: 1, limit } },
    enabled: !!user,
  });

  const handleTabClick = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status);
    setCurrentPage(1);
  };

  return {
    data: data.data,
    pagination: data.pagination,
    isLoading,
    isError,
    currentPage,
    setCurrentPage,
    selectedStatus,
    handleTabClick,
  };
};
