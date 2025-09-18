"use client"

import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/Context/AuthContext"
import { getDepartments } from "@/Api/departments-service"
import { getJobTitles } from "@/Api/job-title-service"
import { getLeavesByUser } from "@/Api/leave-service"
import { getItemsRequest } from "@/Api/items-requests-service"
import { getUserLeavesBalance } from "@/Api/users-service"

export const useProfileData = () => {
  const { user } = useAuth()

  const departments = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  })

  const jobTitles = useQuery({
    queryKey: ["jobTitles"],
    queryFn: getJobTitles,
  })

  const leaveData = useQuery({
    queryKey: ["leaveData"],
    queryFn: () => getLeavesByUser(user?.id || ""),
    enabled: !!user?.id,
  })

  const itemsRequest = useQuery({
    queryKey: ["itemsRequest"],
    queryFn: () => getItemsRequest(undefined, undefined, user?.id || ""),
    enabled: !!user?.id,
  })

  const leaveBalance = useQuery({
    queryKey: ["leaveBalance"],
    queryFn: () => getUserLeavesBalance(user?.id || ""),
    enabled: !!user?.id,
  })

  return {
    departments: departments.data || [],
    jobTitles: jobTitles.data || [],
    leaveData: leaveData.data || [],
    itemsRequest: itemsRequest.data || [],
    leaveBalance: leaveBalance.data || [],
    isLoading:
      departments.isLoading ||
      jobTitles.isLoading ||
      leaveData.isLoading ||
      itemsRequest.isLoading ||
      leaveBalance.isLoading,
  }
}
