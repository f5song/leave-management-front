import { getDepartments } from "@/Api/departments-service"
import { getItemsRequest } from "@/Api/items-requests-service"
import { getUserLeavesBalance } from "@/Api/users-service"
import { getLeavesByUser } from "@/Api/leave-service"
import { useQuery } from "@tanstack/react-query"
import { getJobTitles } from "@/Api/job-title-service"

export const useProfileData = (userId: string) => {
  const { data: departments = [] } = useQuery({ 
    queryKey: ['departments'], 
    queryFn: getDepartments 
  })
  
  const { data: jobTitles = [] } = useQuery({ 
    queryKey: ['jobTitles'], 
    queryFn: getJobTitles 
  })
  
  const { data: leaveData = [] } = useQuery({ 
    queryKey: ['leaveData'], 
    queryFn: () => getLeavesByUser(userId || '') 
  })
  
  const { data: itemsRequest = [] } = useQuery({ 
    queryKey: ['itemsRequest'], 
    queryFn: () => getItemsRequest(undefined, undefined, userId || '') 
  })
  
  const { data: leaveBalance = [] } = useQuery({ 
    queryKey: ['leaveBalance'], 
    queryFn: () => getUserLeavesBalance(userId || '') 
  })

  return { departments, jobTitles, leaveData, itemsRequest, leaveBalance }
}