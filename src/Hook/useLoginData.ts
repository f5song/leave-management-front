import { useQuery } from "@tanstack/react-query";
import { getBirthdays } from "../Api/users-service";
import { getHolidays } from "../Api/holidays-service";
import { expandHolidayDates } from "../Api/holidays-service/utils/expandHolidayDates";
import { groupHolidaysByMonth } from "../Api/holidays-service/utils/groupHolidays";

export const useLoginData = () => {
    const currentMonth = new Date().getMonth()
    
    const { data: holidays = [] } = useQuery({
      queryKey: ['holidays'],
      queryFn: getHolidays,
    })
  
    const { data: birthdays = [] } = useQuery({
      queryKey: ['birthdays'],
      queryFn: getBirthdays
    })
  
    const expandedHolidays = expandHolidayDates(holidays)
    const filteredHolidays = expandedHolidays.filter(h => 
      new Date(h.startDate).getMonth() === currentMonth
    )
    const holidaysGroupedByMonth = groupHolidaysByMonth(expandedHolidays)
    const filteredBirthdays = birthdays.filter(item => 
      new Date(item.birthDate).getMonth() === currentMonth
    )
  
    return {
      filteredHolidays,
      holidaysGroupedByMonth,
      filteredBirthdays,
      currentMonth
    }
  }
  