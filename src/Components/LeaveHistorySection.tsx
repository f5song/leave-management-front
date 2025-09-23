import { ArrowIcon, CalendarIcon } from "@/Shared/Asseet/Icons";
import HistoryCard from "./HistoryCard";
import { formatDate } from "@/Shared/utils/dateUtils";

type LeaveHistorySectionProps = {
    leaves: any[];
};

const leaveTypeLabels: Record<string, string> = {
    PERSONAL: "ลากิจ",
    SICK: "ลาป่วย",
    ANNUAL: "ลาพักร้อน",
};

export const LeaveHistorySection = ({ leaves }: LeaveHistorySectionProps) => {
    return (
        <div className="flex flex-col pt-5">
            <HistoryCard
                title="แจ้งลางาน"
            >
                {leaves.length > 0 ? (
                    leaves.map((leave: any, index: number) => (
                        <div
                            key={index}
                            className="flex flex-row justify-between border-b border-[#676767] pt-3 pb-1 items-center"
                        >
                            <div className="min-w-0">
                                <p className="font-sukhumvit text-[16px] text-white truncate">{leaveTypeLabels[leave.leaveTypeId]} {leave.totalDays} วัน</p>
                                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] truncate">{leave.title}</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center justify-center min-w-0">
                                    <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] whitespace-nowrap">{formatDate(leave.startDate)}</p>
                                    <ArrowIcon className="fill-white mx-2 flex-shrink-0" />
                                    <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] whitespace-nowrap">{formatDate(leave.endDate)}</p>
                                </div>
                                <div className="min-w-0">
                                    <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] truncate text-right">
                                        {leave.userInfo?.firstName + " " + leave.userInfo?.lastName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 py-3">ไม่พบประวัติการลา</p>
                )}
            </HistoryCard>
        </div>
    );
};
