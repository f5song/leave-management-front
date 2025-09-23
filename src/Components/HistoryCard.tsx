import type { ReactNode } from "react";

type HistoryCardProps = {
  title: string;                   
  icon?: ReactNode;                
  onViewAll?: () => void;          
  children: ReactNode;             
};

const HistoryCard = ({ title, icon, onViewAll, children }: HistoryCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full max-w-6xl rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
        <div className="flex flex-col w-full py-5 px-5 min-w-[500px]">
          {/* Header */}
          <div className="flex flex-row justify-between items-center">
            <p className="font-sukhumvit text-[20px] font-bold">{title}</p>
            {onViewAll && (
              <div
                className="flex flex-row items-center cursor-pointer group hover:text-white"
                onClick={onViewAll}
              >
                {icon && <span className="w-[15px] h-[15px]">{icon}</span>}
                <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">
                  ดูทั้งหมด
                </p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="mt-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
