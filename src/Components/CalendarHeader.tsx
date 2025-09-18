import { ChevronLeft, ChevronRight } from "lucide-react"

const MONTH_NAMES = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ]
  
const CalendarHeader = ({ currentDate, onNavigate }) => (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button onClick={() => onNavigate(-1)} className="p-2 hover:bg-gray-700 rounded transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-sukhumvit text-[20px]">{MONTH_NAMES[currentDate.getMonth() - 1]}</span>
      </div>
  
      <div className="flex items-center space-x-4">
        <h2 className="font-sukhumvit-bold text-[20px]">
          {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
      </div>
  
      <div className="flex items-center space-x-4">
        <span className="font-sukhumvit text-[20px]">{MONTH_NAMES[currentDate.getMonth() + 1]}</span>
        <button onClick={() => onNavigate(1)} className="p-2 hover:bg-gray-700 rounded transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )

export default CalendarHeader