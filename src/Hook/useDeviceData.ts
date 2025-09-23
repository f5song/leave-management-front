import { getItemsRequest } from "@/Api/items-requests-service";
import { getItemsStock } from "@/Api/items-service";
import { useQuery } from "@tanstack/react-query";

export const useDeviceData = (user: any, isLoading: boolean, currentPage: number, itemPerPage: number) => {
    // Items Stock Query
    const itemsStockQuery = useQuery({
        queryKey: ['items-stock', user?.role || 'guest'],
        queryFn: async () => {
            if (!user || isLoading) return [];
            const response = await getItemsStock();
            return response.data;
        },
        enabled: !!user && !isLoading,
    });

    // Items Request Query
    const itemsRequestQuery = useQuery({
        queryKey: ['items-request', user?.role || 'guest', currentPage],
        queryFn: async () => {
            if (!user || isLoading) {
                return { data: [], pagination: { totalItems: 0, totalPages: 1, page: 1, limit: 9 } };
            }

            const userId = user.role === 'admin' ? undefined : user.id;
            const response = await getItemsRequest(currentPage, itemPerPage, userId, undefined);
            return response;
        },
        enabled: !!user && !isLoading,
    });

    return {
        itemsStock: itemsStockQuery.data || [],
        itemsRequest: itemsRequestQuery.data || { data: [], pagination: { totalItems: 0, totalPages: 1, page: 1, limit: 9 } },
        isLoadingStock: itemsStockQuery.isLoading,
        isLoadingRequest: itemsRequestQuery.isLoading,
    };
};
