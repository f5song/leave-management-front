import { useProfileData } from "@/Hooks/useProfileData";
import { useAuth } from "@/Context/AuthContext";
import { ILeaveBalance } from "@/Interfaces/leave.interface";

const LeaveBalance = () => {
  const { user } = useAuth();
  const { leaveBalance } = useProfileData(undefined, undefined, user?.id);
  return (
    <div className="w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10 px-5 py-5">
      <div className="flex flex-row gap-x-6">
        {leaveBalance?.map((leave: ILeaveBalance, index: number) => (
          <div key={leave.id} className="flex items-center">
            <div className="flex flex-col min-w-[120px] max-w-[144px]">
              <p className="font-sukhumvit text-[20px] font-bold">{leave.name}</p>
              <div className="flex justify-end space-x-1">
                <p className={`text-[32px] font-sukhumvit font-bold ${leave.used_days > leave.max_days ? "text-red-500" : "text-primary"}`}>{leave.used_days}</p>
                <p className="text-[32px] font-sukhumvit font-bold text-primary">/{leave.max_days}</p>
              </div>
            </div>
            {index !== leaveBalance?.length - 1 && <div className="w-px h-[72px] bg-white opacity-30 mx-3" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalance;
