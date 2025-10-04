import { IxEmoteSadFilledIcon } from "@/Shared/Asseet/Icons";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "เดือนนี้ไม่มีวันหยุด",
}) => (
  <div className="flex flex-row items-center justify-center w-full h-[102px] bg-[#FFFFFF14] rounded-[8px]">
    <IxEmoteSadFilledIcon className="w-[52px] h-[52px] fill-[#FF9B05] mr-2" />
    <p className="text-[#FF9B05] text-[24px] font-sukhumvit-bold text-center">{message}</p>
  </div>
);
