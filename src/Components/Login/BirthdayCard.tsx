export const BirthdayCard = ({ birthday }) => {
    const dateObj = new Date(birthday.birthDate)
    const dayName = dateObj.toLocaleDateString('th-TH', { weekday: 'long' }).replace(/^วัน/, '')
    const dayNumber = dateObj.toLocaleDateString('th-TH', { day: '2-digit' })
    const displayName = birthday.nickName || birthday.firstName || 'ไม่มีชื่อ'
  
    return (
      <div className="w-[141px] h-[102px] rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-3 py-2 shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="font-sukhumvit w-[69px] h-[30px] rounded-[4px] border border-[#FDC911] text-[#FDC911] text-sm font-semibold flex items-center justify-center">
            {dayName}
          </div>
          <div className="font-sukhumvit text-primary text-[32px] font-bold">{dayNumber}</div>
        </div>
        <div className="h-[1px] bg-white/30 mb-2" />
        <p className="font-sukhumvit text-white/70 text-sm truncate">วันเกิด{displayName}</p>
      </div>
    )
  }