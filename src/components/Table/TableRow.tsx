import React from "react";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow.svg";

type LeaveItem = {
  leaveType: string;
  reason: string;
  numberOfDays: number;
  status: string;
  startDate: string;
  endDate: string;
};

type TableRowProps = {
  item: LeaveItem;
};

function getStatusClass(status: string) {
  switch (status) {
    case "อนุมัติ":
      return "border-green-400";
    case "รอดำเนินการ":
      return "border-yellow-400";
    case "ไม่อนุมัติ":
      return "border-red-400";
    default:
      return "border-gray-400";
  }
}

const TableRow: React.FC<TableRowProps> = ({ item }) => {
  return (
    <tr className="border-b border-[#676767] text-[var(--color-font-gray)]">
      <td className="px-4 py-2 w-[162px] text-white font-sukhumvit">{item.leaveType}</td>
      <td className="px-4 py-2 w-[344px] font-sukhumvit">{item.reason}</td>
      <td className="px-4 py-2 w-[81px] text-center font-sukhumvit">{item.numberOfDays}</td>
      <td className="px-4 py-2 w-[65px] text-center">
        <div
          className={`bg-[#00000052] w-[65px] h-[26px] rounded-[16px] border flex items-center justify-center ${getStatusClass(
            item.status
          )}`}
        >
          <span className="text-[14px] font-sukhumvit text-white">{item.status}</span>
        </div>
      </td>
      <td className="px-4 py-2 w-[200px] font-sukhumvit flex items-center gap-1">
        <span>{item.startDate}</span>
        <ArrowIcon className="fill-white" />
        <span>{item.endDate}</span>
      </td>
    </tr>
  );
};

export default TableRow;