export const HolidayCard = ({ holiday }) => {
    const dateObj = new Date(holiday.startDate)
    const dayName = dateObj.toLocaleDateString('th-TH', { weekday: 'long' }).replace(/^วัน/, '')
    const dayNumber = dateObj.toLocaleDateString('th-TH', { day: '2-digit' })
  
    return (
      <div className="w-[141px] h-[102px] rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-3 py-2 shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="font-sukhumvit-bold w-[69px] h-[30px] p-1 rounded-[4px] border border-[#FDC911] text-[#FDC911] text-[16px] font-semibold flex items-center justify-center">
            {dayName}
          </div>
          <div className="font-sukhumvit-bold text-primary text-[32px] font-bold">
            {dayNumber}
          </div>
        </div>
        <div className="h-[1px] bg-white/30 mb-2" />
        <p className="font-sukhumvit text-white/70 text-[14px] truncate">{holiday.title}</p>
      </div>
    )
  }