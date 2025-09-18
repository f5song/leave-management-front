import { getLeaves } from "@/Api/leave-service"
import { useQuery } from "@tanstack/react-query"
import { getLeavesByUser } from "@/Api/leave-service"
import { getHolidays } from "@/Api/holidays-service"
import { getUserLeavesBalance } from "@/Api/users-service"
import { useAuth } from "@/Context/AuthContext"

// Calendar Hooks
const useCalendarData = (user, isLoading) => {
    const leaves = useQuery({
        queryKey: ["leaves", user?.id],
        queryFn: async () => {
            if (!user || isLoading) return []
            const response = await getLeaves()
            const allLeaves = response.data

            if (user.role === "admin") return allLeaves

            const myLeaves = allLeaves.filter(l => l.userId === user?.id)
            const othersLeaves = allLeaves.filter(l => l.userId !== user?.id && l.status === "APPROVED")
            const combined = [...myLeaves, ...othersLeaves]

            return Array.from(new Map(combined.map(l => [l.id, l])).values())
        },
        enabled: !!user && !isLoading,
    })

    const userLeaves = useQuery({
        queryKey: ["leavesByUser", user?.id],
        queryFn: () => getLeavesByUser(user?.id || ""),
        enabled: !!user && !isLoading,
    })

    const holidays = useQuery({
        queryKey: ["holidays"],
        queryFn: getHolidays,
    })

    const leaveBalance = useQuery({
        queryKey: ["leaveBalance"],
        queryFn: () => getUserLeavesBalance(user?.id || ""),
        enabled: !!user,
    })

    return {
        leaves: leaves.data || [],
        userLeaves: userLeaves.data || [],
        holidays: holidays.data || [],
        leaveBalance: leaveBalance.data || [],
    }
}

export default useCalendarData

