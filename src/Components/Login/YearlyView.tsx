import { IHoliday } from "@/Interfaces/holidays.interface"

interface HolidaysGroupedByMonth {
    [month: string]: IHoliday[]
}

interface HolidayProps {
    holidaysGroupedByMonth: HolidaysGroupedByMonth
}

export const YearlyView = ({ holidaysGroupedByMonth }: HolidayProps) => (
    <div className="flex flex-row gap-4 flex-wrap">
        {Object.entries(holidaysGroupedByMonth).map(([month, holidaysInMonth]) => (
            <div key={month} className="rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-4 shadow-md backdrop-blur-sm">
                <h3 className="font-sukhumvit text-white text-[16px] font-bold mb-2">{month}</h3>
                <ul className="flex flex-wrap gap-6">
                    {holidaysInMonth.map((holiday: IHoliday) => {
                        const dateObj = new Date(holiday.startDate)
                        const dayName = dateObj.toLocaleDateString('th-TH', { weekday: 'long' }).replace(/^วัน/, '')
                        const dayNumber = dateObj.toLocaleDateString('th-TH', { day: '2-digit' })

                        return (
                            <li key={holiday.id} className="text-white/80 text-sm flex flex-col gap-2 pr-4 border-r border-white/30 last:border-none">
                                <div className="flex items-center gap-2">
                                    <div className="font-sukhumvit w-[69px] h-[30px] rounded-[4px] border border-[#FDC911] text-[#FDC911] text-[16px] font-semibold flex items-center justify-center">
                                        {dayName}
                                    </div>
                                    <div className="font-sukhumvit text-primary text-[32px] font-bold">
                                        {dayNumber}
                                    </div>
                                </div>
                                <span className="font-sukhumvit text-[var(--color-font)]">{holiday.title}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        ))}
    </div>
)
