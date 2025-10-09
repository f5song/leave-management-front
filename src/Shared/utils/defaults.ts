export const defaultPaginatedData = <T>(page = 1, limit = 10) => ({
    data: [] as T[],
    pagination: { totalItems: 0, totalPages: 1, page, limit },
  });
  