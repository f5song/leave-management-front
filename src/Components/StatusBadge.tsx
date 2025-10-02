import React from "react";

type Props = {
  status: string;
};

const getStatusClass = (status: string): string => {
  switch (status) {
    case "อนุมัติ":
      return "border-[#34D399] text-[#34D399]";
    case "รออนุมัติ":
      return "border-[#6FA5F7] text-[#6FA5F7]";
    case "ปฏิเสธ":
      return "border-[#EF4444] text-[#EF4444]";
    case "มีในสต๊อค":
      return "border-[#34D399] text-[#34D399]";
    default:
      return "border-[#FFD000] text-[#FFD000]";
  }
};

const StatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <div className="flex items-center justify-center h-[26px] min-w-[100px]">
      <span
        className={`inline-block font-sukhumvit text-[14px] bg-[#00000052] px-2 py-1 rounded-[16px] border ${getStatusClass(
          status
        )} truncate`}
        title={status}
      >
        {status}
      </span>
    </div>
  );
};

export default StatusBadge;
