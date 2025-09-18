import { ArrowIcon, CalendarIcon } from "@/Shared/Asseet/Icons"
import HistorySection from "./HistorySection"

const LeaveHistorySection = ({ user, userLeaves, leaves, onToggleModal }) => {
    const renderEmployeeLeaves = () => (
        userLeaves?.map((leave, index) => (
            <div key={index} className="grid grid-cols-[110px_1fr] gap-4 border-b border-[#676767] pt-3 pb-1 items-center">
                <div className="min-w-0">
                    <p className="font-sukhumvit text-[16px] text-white truncate">{leave.type}</p>
                    <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] truncate">{leave.title}</p>
                </div>
                <div className="flex flex-row items-center justify-end min-w-0">
                    <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] whitespace-nowrap">
                        {new Date(leave.startDate).toISOString().split("T")[0]}
                    </p>
                    <ArrowIcon className="fill-white mx-2 flex-shrink-0" />
                    <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] whitespace-nowrap">
                        {new Date(leave.endDate).toISOString().split("T")[0]}
                    </p>
                </div>
            </div>
        ))
    )
    const renderAdminLeaves = () => (
        leaves?.map((leave, index) => (
            <div key={index} className="grid grid-cols-[110px_1fr_150px] gap-4 border-b border-[#676767] pt-3 pb-1 items-center">
                <div className="min-w-0">
                    <p className="font-sukhumvit text-[16px] text-white truncate">{leave.type}</p>
                    <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] truncate">{leave.title}</p>
                </div>
                <div className="flex flex-row items-center justify-center min-w-0">
                    <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] whitespace-nowrap">
                        {new Date(leave.startDate).toISOString().split("T")[0]}
                    </p>
                    <ArrowIcon className="fill-white mx-2 flex-shrink-0" />
                    <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] whitespace-nowrap">
                        {new Date(leave.endDate).toISOString().split("T")[0]}
                    </p>
                </div>
                <div className="min-w-0">
                    <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] truncate text-right">
                        {leave.userInfo?.firstName + " " + leave.userInfo?.lastName}
                    </p>
                </div>
            </div>
        ))
    )

    return (
        <div className="flex flex-col pt-5">
            <HistorySection
                title="ประวัติการลา"
                icon={<CalendarIcon className="w-[15px] h-[15px]" />}
                onViewAllClick={onToggleModal}
            >
                {user?.role === "employee" ? renderEmployeeLeaves() : renderAdminLeaves()}
            </HistorySection>
        </div>
    )
}

export default LeaveHistorySection