import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "@/Api/departments-service";
import { getJobTitles } from "@/Api/job-title-service";
import { getItemsRequest } from "@/Api/items-requests-service";
import { getUserLeavesBalance } from "@/Api/users-service";
import { getLeaves } from "@/Api/leave-service";

import { IDepartment } from "@/Interfaces/departments.interface";
import { IJob } from "@/Interfaces/jobs.interface";
import { ILeave, ILeaveBalance } from "@/Interfaces/leave.interface";
import { IItemRequest } from "@/Interfaces/item.interface";
import { PaginationQueryParams, IPaginatedResponse } from "@/Interfaces/hooks.interface";

interface UseProfileReturn extends PaginationQueryParams {
  userId?: string;
  departments: IDepartment[];
  jobTitles: IJob[];
  leaveData: IPaginatedResponse<ILeave>;
  itemsRequest: IPaginatedResponse<IItemRequest>;
  leaveBalance: ILeaveBalance[];
}

export const useProfileData = (
  page: number = 1,
  limit: number = 10,
  userId?: string
): UseProfileReturn => {
  const { data: departments = [] } = useQuery<IDepartment[]>({
    queryKey: ['departments'],
    queryFn: getDepartments,
  });

  const { data: jobTitles = [] } = useQuery<IJob[]>({
    queryKey: ['jobTitles'],
    queryFn: getJobTitles,
  });

  const { data: leaveData = { data: [], pagination: { totalItems: 0, totalPages: 1, page, limit } } } = useQuery<IPaginatedResponse<ILeave>>({
    queryKey: ['leaveData', userId, page, limit],
    queryFn: () => getLeaves(page, limit, userId!),
    enabled: !!userId,
  });

  const { data: itemsRequest = { data: [], pagination: { totalItems: 0, totalPages: 1, page, limit } } } =
    useQuery<IPaginatedResponse<IItemRequest>>({
      queryKey: ['itemsRequest', userId, page, limit],
      queryFn: () => getItemsRequest(page, limit, userId!),
      enabled: !!userId,
    });

  const { data: leaveBalance = [] } = useQuery<ILeaveBalance[]>({
    queryKey: ['leaveBalance', userId],
    queryFn: () => getUserLeavesBalance(userId!),
    enabled: !!userId,
  });

  return {
    userId,
    page,
    limit,
    departments,
    jobTitles,
    leaveData,
    itemsRequest,
    leaveBalance,
  };
};
