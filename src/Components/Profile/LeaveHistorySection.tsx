import { ArrowIcon, CalendarIcon, ComputerIcon } from "@/Shared/Asseet/Icons"
import HistorySection from "../HistorySection"

export const LeaveHistorySection = ({ leaveData, onToggleModal }) => (
    <HistorySection
      title="ประวัติการลา"
      icon={<CalendarIcon className="w-[15px] h-[15px]" />}
      onViewAllClick={onToggleModal}
    >
      {leaveData.map((leave, index) => (
        <div key={index} className="grid grid-cols-[110px_178px_1fr] gap-4 border-b border-[#676767] pt-3 pb-1 items-center">
          <div className="min-w-0">
            <p className="font-sukhumvit text-[16px] text-white truncate">{leave.title}</p>
          </div>
          <div className="min-w-0">
            <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] truncate">{leave.description}</p>
          </div>
          <div className="flex flex-row items-center justify-end min-w-0">
            <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] whitespace-nowrap">
              {new Date(leave.startDate).toISOString().split('T')[0]}
            </p>
            <ArrowIcon className="fill-white mx-2 flex-shrink-0" />
            <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] whitespace-nowrap">
              {new Date(leave.endDate).toISOString().split('T')[0]}
            </p>
          </div>
        </div>
      ))}
    </HistorySection>
  )
  
export const ItemsHistorySection = ({ itemsRequest, onToggleModal }) => (
    <HistorySection
      title="ประวัติยืมอุปกรณ์"
      icon={<ComputerIcon className="w-[15px] h-[15px]" />}
      onViewAllClick={onToggleModal}
    >
      {itemsRequest?.data?.map((item, index) => (
        <div key={index} className="grid grid-cols-[232px_68px_1fr] gap-4 border-b border-[#676767] pt-3 pb-1 items-center">
          <div className="min-w-0">
            <p className="font-sukhumvit text-[16px] text-white truncate">{item.item.name}</p>
          </div>
          <div className="min-w-0">
            <p className="font-sukhumvit-semibold text-[14px] text-white whitespace-nowrap">จำนวน {item.quantity}</p>
          </div>
          <div className="min-w-0">
            <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] whitespace-nowrap">
              {new Date(item.createdAt).toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' })}
            </p>
          </div>
        </div>
      ))}
    </HistorySection>
  )
