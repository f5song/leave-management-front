interface LeaveBalance {
    id: string;
    name: string;
    used_days: number;
    max_days: number;
}

export const LeaveBalanceCard = ({ leaveBalance }: { leaveBalance: LeaveBalance[] }) => (
    <div className="w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10 px-5 py-5">
      <div className="flex flex-row gap-x-6">
        {leaveBalance.map((item: LeaveBalance, idx: number) => (
          <div key={item.id} className="flex items-center">
            <div className="flex flex-col min-w-[120px] max-w-[144px]">
              <p className="font-sukhumvit text-[20px] font-bold text-white">{item.name}</p>
              <div className="flex justify-end space-x-1">
                <p className={`text-[32px] font-sukhumvit font-bold ${
                  item.used_days > item.max_days ? "text-red-500" : "text-primary"
                }`}>
                  {item.used_days}
                </p>
                <p className="text-[32px] font-sukhumvit font-bold text-primary">/{item.max_days}</p>
              </div>
            </div>
            {idx !== leaveBalance.length - 1 && (
              <div className="w-px h-[72px] bg-white opacity-30 mx-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  )