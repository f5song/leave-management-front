const MONTH_NAMES = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ]
export const ViewToggle = ({ view, onViewChange, currentMonth }) => (
    <div className="flex gap-2 md:gap-4 rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-1 shadow-lg">
      <button
        className={`font-sukhumvit text-[16px] md:text-[20px] font-semibold py-2 px-4 w-[110px] md:w-[130px] rounded-[8px] ${
          view === 'monthly' ? 'bg-primary text-[#191919]' : 'text-primary'
        }`}
        onClick={() => onViewChange('monthly')}
      >
        {MONTH_NAMES[currentMonth]}
      </button>
      <button
        className={`font-sukhumvit text-[16px] md:text-[20px] font-semibold py-2 px-4 w-[110px] md:w-[130px] rounded-[8px] ${
          view === 'yearly' ? 'bg-primary text-[#191919]' : 'text-primary'
        }`}
        onClick={() => onViewChange('yearly')}
      >
        ปี {new Date().getFullYear()}
      </button>
    </div>
  )
