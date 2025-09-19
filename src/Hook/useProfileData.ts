import { getDepartments } from "@/Api/departments-service"
import { getItemsRequest } from "@/Api/items-requests-service"
import { getUserLeavesBalance } from "@/Api/users-service"
import { getLeavesByUser } from "@/Api/leave-service"
import { useQuery } from "@tanstack/react-query"
import { getJobTitles } from "@/Api/job-title-service"
import { useAuth } from "@/Context/AuthContext"

export const useProfileData = () => {
  const { user } = useAuth()
  const { data: departments = [] } = useQuery({ queryKey: ['departments'], queryFn: getDepartments });
  const { data: jobTitles = [] } = useQuery({ queryKey: ['jobTitles'], queryFn: getJobTitles });
  const { data: leaveData = [] } = useQuery({ queryKey: ['leaveData'], queryFn: () => getLeavesByUser(user?.id || '') });
  const { data: itemsRequest = [] } = useQuery({ queryKey: ['itemsRequest'], queryFn: () => getItemsRequest(undefined, undefined, user?.id || '') });
  const { data: leaveBalance = [] } = useQuery({ queryKey: ['leaveBalance'], queryFn: () => getUserLeavesBalance(user?.id || '') });
  return { departments, jobTitles, leaveData, itemsRequest, leaveBalance }
}