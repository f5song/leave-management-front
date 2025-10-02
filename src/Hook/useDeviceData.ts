import { getItemsStock } from "@/Api/items-service";
import { useQuery } from "@tanstack/react-query";

type PaginatedData<T> = {
    data: T[];
    pagination: { totalItems: number; totalPages: number; page: number; limit: number };
};

export const useDeviceData = (
    user?: any,
    isLoading?: boolean,
    currentPage: number = 1,
    itemsPerPage: number = 9,
    filter?: string // status filter
) => {
    const itemsStockQuery = useQuery({
        queryKey: ['items-stock', currentPage, itemsPerPage, filter],
        queryFn: async () => {
            if (!user || isLoading) {
                return {
                    data: [],
                    pagination: { totalItems: 0, totalPages: 1, page: 1, limit: itemsPerPage }
                };
            }
            const response = await getItemsStock(currentPage, itemsPerPage, filter);
            return response;
        },
        enabled: !!user && !isLoading,
    });

    return {
        itemsStock: itemsStockQuery.data || { data: [], pagination: { totalItems: 0, totalPages: 1, page: currentPage, limit: itemsPerPage } },
        isLoadingStock: itemsStockQuery.isLoading,
    };
};
