import { getDepartments } from "@/Api/departments-service"
import { getItemsRequest } from "@/Api/items-requests-service"
import { getUserLeavesBalance } from "@/Api/users-service"
import { getLeaves, getLeavesByUser } from "@/Api/leave-service"
import { useQuery } from "@tanstack/react-query"
import { getJobTitles } from "@/Api/job-title-service"

export const useProfileData = (page?: number, limit?: number, userId?: string) => {
  const { data: departments = [] } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments
  });

  const { data: jobTitles = [] } = useQuery({
    queryKey: ['jobTitles'],
    queryFn: getJobTitles
  });

  const { data: leaveData = [] } = useQuery({
    queryKey: ["leaveData", userId, page, limit],
    queryFn: () => getLeaves(page, limit, userId!),
    enabled: !!userId,
  });

  const { data: itemsRequest = [] } = useQuery({
    queryKey: ["itemsRequest", userId, page, limit],
    queryFn: () => getItemsRequest(page, limit, userId!),
    enabled: !!userId,
  });

  const { data: leaveBalance = [] } = useQuery({
    queryKey: ['leaveBalance', userId],
    queryFn: () => getUserLeavesBalance(userId!),
    enabled: !!userId,
  });

  return { departments, jobTitles, 
    leaveData,
    itemsRequest,
    leaveBalance };
};
