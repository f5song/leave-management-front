import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { getBirthdays } from "@/Api/users-service"
import { getHolidays } from "@/Api/holidays-service"
import { expandHolidayDates } from "@/Api/holidays-service/utils/expandHolidayDates"
import { groupHolidaysByMonth } from "@/Api/holidays-service/utils/groupHolidays"
import { IHoliday } from "@/Interfaces/holidays.interface"
import { IUser } from "@/Interfaces/user.interface"

interface UseLoginDataReturn {
  filteredHolidays: IHoliday[]
  holidaysGroupedByMonth: Record<string, IHoliday[]>
  filteredBirthdays: IUser[]
  currentMonth: number
}

export const useLoginData = (): UseLoginDataReturn => {
  const currentMonth = new Date().getMonth()

  // Fetch holidays
  const { data: holidays = [] } = useQuery<IHoliday[]>({
    queryKey: ['holidays'],
    queryFn: getHolidays,
  })

  // Fetch birthdays
  const { data: birthdays = [] } = useQuery<IUser[]>({
    queryKey: ['birthdays'],
    queryFn: getBirthdays,
  })

  // Memoize expanded holidays
  const expandedHolidays = useMemo(() => expandHolidayDates(holidays), [holidays])

  // Memoize grouped holidays
  const holidaysGroupedByMonth = useMemo(() => groupHolidaysByMonth(expandedHolidays), [expandedHolidays])

  // Filter holidays for current month
  const filteredHolidays = useMemo(
    () => expandedHolidays.filter(h => new Date(h.startDate).getMonth() === currentMonth),
    [expandedHolidays, currentMonth]
  )

  // Filter birthdays for current month
  const filteredBirthdays = useMemo(
    () => birthdays.filter(b => new Date(b.birthDate).getMonth() === currentMonth),
    [birthdays, currentMonth]
  )

  return {
    filteredHolidays,
    holidaysGroupedByMonth,
    filteredBirthdays,
    currentMonth,
  }
}
