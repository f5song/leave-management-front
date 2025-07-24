import React from "react";
import { ArrowIcon } from "@/Shared/Asseet/Icons";

type LeaveData = {
  leaveType: string;
  reason: string;
  numberOfDays: number;
  status: string;
  startDate: string;
  endDate: string;
};

type TableBodyProps = {
  data: LeaveData[];
  getStatusClass: (status: string) => string;
};

const TableBody: React.FC<TableBodyProps> = ({ data, getStatusClass }) => {
  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={index} className="border-b border-[#676767] text-left">
          <td className="w-[162px] px-4 py-[10px] text-white font-sukhumvit">
            {item.leaveType}
          </td>
          <td className="w-[344px] px-4 py-[10px] text-[var(--color-font-gray)] font-sukhumvit">
            {item.reason}
          </td>
          <td className="w-[81px] px-4 py-[10px] text-center text-[var(--color-font-gray)] font-sukhumvit">
            {item.numberOfDays}
          </td>
          <td className="w-[65px] px-4 py-[10px]">
            <div
              className={`bg-[#00000052] h-[26px] rounded-[16px] border flex items-center justify-center ${getStatusClass(
                item.status
              )}`}
            >
              <p className="text-[14px] text-white font-sukhumvit text-center">
                {item.status}
              </p>
            </div>
          </td>
          <td className="w-[200px] px-4 py-[10px] flex items-center gap-1 text-[var(--color-font-gray)] font-sukhumvit">
            <span>{item.startDate}</span>
            <ArrowIcon className="fill-white" />
            <span>{item.endDate}</span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;