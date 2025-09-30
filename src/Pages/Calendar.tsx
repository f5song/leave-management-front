import BackgroundGradient from "@/Components/BackgroundGradient"
import HorizontalDivider from "@/Components/HorizontalDivider"
import LeaveBalance from "@/Components/LeaveBalance"
import { LeaveHistorySection } from "@/Components/LeaveHistorySection"
import LeaveModal from "@/Components/Modals/LeaveModal"
import LeaveRequestModal from "@/Components/Modals/LeaveRequestModal"
import Navbar from "@/Components/Navbar"
import { useAuth } from "@/Context/AuthContext"
import useCalendarData from "@/Hook/useCalendarData"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"

// FullCalendar imports
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import thLocale from "@fullcalendar/core/locales/th"
import { MONTH_NAMES } from "@/Shared/Constants/calendar"



const Calendar = () => {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false)
  const [isLeaveRequestModalOpen, setLeaveRequestModalOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  const calendarRef = useRef<FullCalendar | null>(null)
  const pages = 1;
  const limit = 10;

  const { calendarLeaves, holidays, leaves } = useCalendarData(user, isLoading, pages, limit)

  const toggleLeaveRequestModal = () => setLeaveRequestModalOpen(v => !v)

  // handle prev/next month
  const handleNavigate = (direction: number) => {
    const api = calendarRef.current?.getApi()
    if (!api) return

    if (direction === -1) api.prev()
    else if (direction === 1) api.next()
    else api.today()

    setCurrentDate(api.getDate())
  }

  const events = [
    ...calendarLeaves.map(l => {
      const endDate = new Date(l.endDate)
      endDate.setDate(endDate.getDate() + 1) // +1 วัน

      return {
        id: l.id,
        title: l.title || "การลา",
        start: l.startDate,
        end: endDate.toISOString().split("T")[0], // ใช้ string date แบบ yyyy-mm-dd
        allDay: true,
        color: l.status === "PENDING" ? "var(--color-gray)" : l.userInfo?.color || "var(--color-primary)",
        textColor: "var(--color-white)",
      }
    }),
    ...holidays.map(h => {
      const endDate = new Date(h.endDate)
      endDate.setDate(endDate.getDate() + 1)

      return {
        id: h.id,
        title: h.title || "วันหยุด",
        start: h.startDate,
        end: endDate.toISOString().split("T")[0],
        allDay: true,
        color: "var(--color-holiday)",
        textColor: "var(--color-white)",
      }
    }),
  ]

  return (
    <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
      {/* Modals */}
      <LeaveModal
        isOpen={isLeaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        title="การลา"
        scope="dashboard"
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
        <div className="flex flex-row justify-between border-b border-[var(--color-gray)] w-full my-6">
          <p className="font-sukhumvit text-[28px] md:text-[36px] font-bold text-center">แดชบอร์ด</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-5">
          {/* Calendar Section */}
          <div className="flex flex-col w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-border)] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10 p-3">

            {/* Calendar Header inline */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button onClick={() => handleNavigate(-1)} className="p-2 hover:bg-gray-700 rounded transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-sukhumvit text-[20px]">
                  {MONTH_NAMES[(currentDate.getMonth() - 1 + 12) % 12]}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <h2 className="font-sukhumvit-bold text-[20px]">
                  {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-sukhumvit text-[20px]">
                  {MONTH_NAMES[(currentDate.getMonth() + 1) % 12]}
                </span>
                <button onClick={() => handleNavigate(1)} className="p-2 hover:bg-gray-700 rounded transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <HorizontalDivider />

            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale={thLocale}
              headerToolbar={false}
              events={events}
              height="auto"
              dayMaxEventRows={3}
              moreLinkContent={(arg) => {
                return <span className="text-xs text-white">และอีก {arg.num} คน</span>
              }}
              datesSet={(arg) => setCurrentDate(arg.start)}
              eventClick={() => toggleLeaveRequestModal()}
              dateClick={() => toggleLeaveRequestModal()}
              eventContent={(arg) => {
                return (
                  <div className="px-2 py-1 text-xs font-sukhumvit truncate">
                    {arg.event.title}
                  </div>
                )
              }}
            />
          </div>

          {/* Right Panel */}
          <div className="flex flex-col">
            <LeaveBalance />
            <LeaveHistorySection
              leaves={leaves.data || []}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
