import { useQuery } from "@tanstack/react-query";
import { getItemsStock } from "@/Api/items-service";
import { IUser } from "@/Interfaces/user.interface";
import { IItem } from "@/Interfaces/item.interface";
import { defaultPaginatedData } from "@/Shared/utils/defaults";
import { IPaginatedResponse } from "@/Interfaces/hooks.interface";

// Props ของ hook
interface UseDeviceDataParams {
  user?: IUser | null;
  isLoading?: boolean;
  currentPage?: number;
  itemsPerPage?: number;
  filter?: string;
}

// Hook
export const useDeviceData = ({
  user,
  isLoading = false,
  currentPage = 1,
  itemsPerPage = 9,
  filter,
}: UseDeviceDataParams) => {

  const itemsStockQuery = useQuery<IPaginatedResponse<IItem>>({
    queryKey: ["items-stock", currentPage, itemsPerPage, filter],
    queryFn: async () => {
      if (!user || isLoading) {
        return defaultPaginatedData<IItem>(currentPage, itemsPerPage);
      }
      const response = await getItemsStock(currentPage, itemsPerPage, filter);
      return response;
    },
    enabled: !!user && !isLoading,
  });

  return {
    itemsStock: itemsStockQuery.data ?? defaultPaginatedData<IItem>(currentPage, itemsPerPage),
    isLoadingStock: itemsStockQuery.isLoading,
    isFetchingStock: itemsStockQuery.isFetching,
    refetchStock: itemsStockQuery.refetch,
  };
};
