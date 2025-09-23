import { ArrowIcon, CalendarIcon } from "@/Shared/Asseet/Icons";
import { useProfileData } from "@/Hook/useProfileData";
import { formatDate } from "@/Shared/utils/dateUtils";
import HistoryCard from "../HistoryCard";
import { useAuth } from "@/Context/AuthContext";

type Props = { toggleLeaveModal: () => void };

const LeaveHistory = ({ toggleLeaveModal }: Props) => {
  const page = 1;
  const limit = 4;
  const { user } = useAuth();
  
  const { leaveData } = useProfileData(page, limit, user?.id!);
  
  return (
    <HistoryCard
      title="ประวัติการลา"
      icon={<CalendarIcon className="fill-[#DCDCDC] group-hover:fill-white transition-colors" />}
      onViewAll={toggleLeaveModal}
    >
      {leaveData?.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-[#DCDCDC] font-sukhumvit">ไม่พบประวัติการลา</p>
        </div>
      ) : (
        leaveData?.data?.map((leave: any, index: number) => (
          <div key={index} className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between">
            <div className="w-[120px]"><p className="font-sukhumvit text-[16px] text-white truncate">{leave.title}</p></div>
            <div className="w-[170px]"><p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] truncate">{leave.description}</p></div>
            <div className="flex flex-row items-center w-[168px]">
            <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{formatDate(leave.startDate)}</p>
            <ArrowIcon className="fill-white" />
            <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{formatDate(leave.endDate)}</p>
          </div>
        </div>
      )))}
    </HistoryCard>
  );
};

export default LeaveHistory;


