import { getLeaves } from "@/Api/leave-service"
import { useQuery } from "@tanstack/react-query"
import { getLeavesByUser } from "@/Api/leave-service"
import { getHolidays } from "@/Api/holidays-service"
import { getUserLeavesBalance } from "@/Api/users-service"
import { IUser } from "@/Interfaces/user.interface"
import { ILeaveBalance, ILeave } from "@/Interfaces/leave.interface"
import { IHoliday } from "@/Interfaces/holidays.interface"


function filterLeaves(allLeaves: ILeave[], userId: string, role: string) {
    if (role === "admin") return allLeaves;
  
    return [
      ...allLeaves.filter(l => l.userId === userId),
      ...allLeaves.filter(l => l.userId !== userId && l.status === "APPROVED")
    ];
  }
  

const useCalendarData = (user: IUser | null, isLoading: boolean, page: number = 1, limit: number = 10) => {
    const calendarLeaves = useQuery<ILeave[]>({
      queryKey: ["calendarLeaves", user?.id],
      queryFn: async () => {
        if (!user) return [];
        const response = await getLeaves();
        const allLeaves = response.data;
        return filterLeaves(allLeaves, user.id, user.role);
      },
      enabled: !!user && !isLoading,
    });
  
    const userLeaves = useQuery<ILeave[]>({
      queryKey: ["leavesByUser", user?.id],
      queryFn: () => getLeavesByUser(user?.id || ""),
      enabled: !!user && !isLoading,
    });
  
    const holidays = useQuery<IHoliday[]>({ queryKey: ["holidays"], queryFn: getHolidays });
    const leaveBalance = useQuery<ILeaveBalance[]>({ queryKey: ["leaveBalance"], queryFn: () => getUserLeavesBalance(user?.id || ""), enabled: !!user });
  
    const leaves = useQuery<ILeave[]>({
      queryKey: ["leaves", page, "APPROVED"],
      queryFn: () => getLeaves(page, limit, undefined, "APPROVED"),
      enabled: !isLoading,
    });
  
    return {
      calendarLeaves: calendarLeaves.data || [],
      calendarLeavesLoading: calendarLeaves.isLoading,
      userLeaves: userLeaves.data || [],
      holidays: holidays.data || [],
      leaveBalance: leaveBalance.data || [],
      leaves: leaves.data || [],
    };
  };
  

export default useCalendarData

