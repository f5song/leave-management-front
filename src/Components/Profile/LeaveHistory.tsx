import { ArrowIcon, CalendarIcon } from "@/Shared/Asseet/Icons";
import { useProfileData } from "@/Hook/useProfileData";

type Props = { toggleLeaveModal: () => void };

const LeaveHistory = ({ toggleLeaveModal }: Props) => {
  const { leaveData } = useProfileData()

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full max-w-6xl rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
        <div className="flex flex-col w-full py-5 px-5">
          <div className="flex flex-row justify-between">
            <p className="font-sukhumvit text-[20px] font-bold">ประวัติการลา</p>
            <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={toggleLeaveModal}>
              <CalendarIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
              <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">ดูทั้งหมด</p>
            </div>
          </div>
          {leaveData?.map((leave, index) => (
            <div key={index} className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between">
              <div className="w-[110px]"><p className="font-sukhumvit text-[16px] text-white">{leave.title}</p></div>
              <div className="w-[178px]"><p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.description}</p></div>
              <div className="flex flex-row items-center w-[168px]">
                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{new Date(leave.startDate).toISOString().split('T')[0]}</p>
                <ArrowIcon className="fill-white" />
                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{new Date(leave.endDate).toISOString().split('T')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;
