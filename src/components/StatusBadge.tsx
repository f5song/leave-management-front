// components/StatusBadge.tsx
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
    default:
      return "border-gray-400 text-gray-400";
  }
};

const StatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <span
      className={`flex items-center justify-center text-[14px] bg-[#00000052] w-[65px] h-[26px] rounded-[16px] border ${getStatusClass(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
