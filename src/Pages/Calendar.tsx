import BackgroundGradient from "@/Components/BackgroundGradient"
import CalendarHeader from "@/Components/CalendarHeader"
import HorizontalDivider from "@/Components/HorizontalDivider"
import LeaveBalanceCard from "@/Components/LeaveBalanceCard"
import LeaveHistorySection from "@/Components/LeaveHistorySection"
import LeaveModal from "@/Components/Modals/LeaveModal"
import LeaveRequestModal from "@/Components/Modals/LeaveRequestModal"
import Navbar from "@/Components/Navbar"
import { useAuth } from "@/Context/AuthContext"
import useCalendarData from "@/Hook/useCalendarData"
import { getCalendarDays, getEventsForDay, getSpanningEvents, getGroupedSpanningEvents } from "@/Shared/utils/calendar-utils"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const DAY_NAMES = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]

const Calendar = () => {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false)
  const [isLeaveRequestModalOpen, setLeaveRequestModalOpen] = useState(false)

  const { leaves, userLeaves, holidays, leaveBalance } = useCalendarData(user, isLoading)
  const days = getCalendarDays(currentDate)

  const toggleLeaveModal = () => setLeaveModalOpen(v => !v)
  const toggleLeaveRequestModal = () => setLeaveRequestModalOpen(v => !v)

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const spanningLeaves = getSpanningEvents(days, leaves, "leave")
  const spanningHolidays = getSpanningEvents(days, holidays, "holiday")
  const allSpanningEvents = [...spanningLeaves, ...spanningHolidays]
  const { limitedEvents } = getGroupedSpanningEvents(allSpanningEvents)

  return (
    <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
      {/* Modals */}
      <LeaveModal
        isOpen={isLeaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        title="ประวัติการลา"
        toggleModal={toggleLeaveModal}
      />
      <LeaveRequestModal
        isOpen={isLeaveRequestModalOpen}
        onClose={() => setLeaveRequestModalOpen(false)}
        title="แจ้งลางาน"
        toggleModal={toggleLeaveRequestModal}
      />

      <Navbar onClick={() => navigate("/home")} />
      <BackgroundGradient />

      <div className="flex flex-col pt-10">
        <div className="flex flex-row justify-between border-b border-[#676767] w-full my-6">
          <p className="font-sukhumvit text-[28px] md:text-[36px] font-bold text-center">แดชบอร์ด</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-5">
          {/* Calendar Section */}
          <div className="flex flex-col w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
            <div className="px-5 pt-5">
              <CalendarHeader currentDate={currentDate} onNavigate={navigateMonth} />
              <HorizontalDivider />

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-0 pb-5 border border-[#FFFFFF14] rounded-[8px] relative">
                {/* Day Headers */}
                {DAY_NAMES.map(day => (
                  <div
                    key={day}
                    className="text-center font-sukhumvit text-[14px] p-3 font-semibold text-white border-b border-[#FFFFFF14]"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {days.map((day, index) => {
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth()
                  const dayLeaves = getEventsForDay(day, leaves)
                  const dayHolidays = getEventsForDay(day, holidays)

                  const allEventsForDay = [...dayLeaves, ...dayHolidays]
                  const hasOverflow = allEventsForDay.length > 2
                  const overflowCount = allEventsForDay.length - 2

                  return (
                    <div
                      key={index}
                      onClick={toggleLeaveRequestModal}
                      className={`relative min-h-[100px] p-2 border-r border-b border-[#FFFFFF14] ${
                        isCurrentMonth
                          ? "bg-gray-800/20 hover:bg-gray-700/30"
                          : "bg-gray-900/20 text-gray-600"
                      } transition-colors cursor-pointer`}
                    >
                      <div className="font-sukhumvit-bold text-right text-sm mb-1">
                        {day.getDate().toString().padStart(2, "0")}
                      </div>

                      {hasOverflow && (
                        <div className="absolute bottom-1 left-1 text-xs font-sukhumvit text-white">
                          และอีก {overflowCount} คน
                        </div>
                      )}
                    </div>
                  )
                })}

                {limitedEvents.map((event, idx) => {
                  const rowOffset = event.weekRow * 100
                  const baseTop = 60
                  const eventHeight = 24
                  const eventSpacing = 4

                  const eventsInSameRow = limitedEvents.filter(e => e.weekRow === event.weekRow)
                  const positionInRow = eventsInSameRow.findIndex(e => e.id === event.id)

                  return (
                    <div
                      key={`spanning-event-${event.id}-${idx}`}
                      className="absolute z-20 rounded-md flex items-center px-3 text-xs font-sukhumvit-semibold truncate shadow-sm"
                      style={{
                        left: `${(event.startIndex % 7) * (100 / 7) + 0.5}%`,
                        width: `${event.span * (100 / 7) - 1}%`,
                        top: `${baseTop + rowOffset + 8 + positionInRow * (eventHeight + eventSpacing)}px`,
                        height: `${eventHeight}px`,
                        border: "2px solid",
                        borderColor:
                          event.status === "PENDING"
                            ? "#6B7280"
                            : event.eventType === "holiday"
                            ? "#6FA5F7"
                            : event.userInfo?.color || "#F59E0B",
                        color:
                          event.status === "PENDING"
                            ? "#6B7280"
                            : event.eventType === "holiday"
                            ? "#6FA5F7"
                            : event.userInfo?.color || "#F59E0B",
                        backgroundColor:
                          event.status === "PENDING"
                            ? "#6B728020"
                            : event.eventType === "holiday"
                            ? "#6FA5F720"
                            : (event.userInfo?.color || "#F59E0B") + "20",
                      }}
                    >
                      {event.title}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col">
            <LeaveBalanceCard leaveBalance={leaveBalance} />
            <LeaveHistorySection
              user={user}
              userLeaves={userLeaves}
              leaves={leaves}
              onToggleModal={toggleLeaveModal}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
