import { useState } from "react";
import { ArrowIcon, BinIcon, CloseIcon } from "@/Shared/Asseet/Icons";

type LeaveItem = {
  leaveType: string;
  reason: string;
  numberOfDays: string;
  status: "อนุมัติ" | "รออนุมัติ" | "ปฏิเสธ";
  startDate: string;
  endDate: string;
};

const leaveData: LeaveItem[] = [
  {
    leaveType: "ลาพักร้อน",
    reason: "ลาไปทำละธุ",
    numberOfDays: "1 วัน",
    status: "รออนุมัติ",
    startDate: "2025-07-21",
    endDate: "2025-07-21",
  },
  {
    leaveType: "ลาพักร้อน",
    reason: "ลาไปทำละธุ",
    numberOfDays: "1 วัน",
    status: "อนุมัติ",
    startDate: "2025-07-21",
    endDate: "2025-07-21",
  },
  {
    leaveType: "ลาพักร้อน",
    reason: "ลาไปทำละธุ",
    numberOfDays: "1 วัน",
    status: "ปฏิเสธ",
    startDate: "2025-07-21",
    endDate: "2025-07-21",
  },
];

type LeaveListProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
  };
};

const statusTabs = [
  { label: "อนุมัติแล้ว", value: "อนุมัติ", color: "#34D399" },
  { label: "รออนุมัติ", value: "รออนุมัติ", color: "#6FA5F7" },
  { label: "ปฏิเสธ", value: "ปฏิเสธ", color: "#EF4444" },
];

function getStatusClass(status: string): string {
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
}

function Tabs({
  selectedStatus,
  onSelect,
}: {
  selectedStatus: string | null;
  onSelect: (status: string | null) => void;
}) {
  return (
    <div className="flex flex-row gap-4 py-5">
      {statusTabs.map((tab) => (
        <div
          key={tab.value}
          onClick={() => onSelect(selectedStatus === tab.value ? null : tab.value)}
          className={`rounded-[4px] w-full h-[33px] bg-[#00000052] flex items-center justify-center cursor-pointer border transition-colors ${
            selectedStatus === tab.value
              ? `text-[${tab.color}] border-[${tab.color}]`
              : "text-[var(--color-gray)] border-transparent hover:text-white"
          }`}
        >
          <p className="font-sukhumvit text-[16px] font-bold">{tab.label}</p>
        </div>
      ))}
    </div>
  );
}

function LeavesTable({ data }: { data: LeaveItem[] }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-5 bg-[#00000052] rounded-[4px] h-[54px] items-center px-4">
        <p className="font-sukhumvit text-[16px] font-bold text-white w-[162px]">
          ลาพักร้อน/ลาป่วย/ลากิจ
        </p>
        <p className="font-sukhumvit text-[16px] font-bold text-white w-[344px]">สาเหตุ</p>
        <p className="font-sukhumvit text-[16px] font-bold text-white w-[81px]">จำนวนวันลา</p>
        <p className="font-sukhumvit text-[16px] font-bold text-white w-[65px]">สถานะ</p>
        <p className="font-sukhumvit text-[16px] font-bold text-white w-[65px]">วันที่ลา</p>
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-row border-b border-[#676767] px-4 py-[10px] gap-5 w-full"
        >
          <div className="w-[162px]">
            <p className="font-sukhumvit text-[16px] text-white">{item.leaveType}</p>
          </div>
          <div className="w-[344px]">
            <p className="font-sukhumvit text-[16px] text-[var(--color-font-gray)]">{item.reason}</p>
          </div>
          <div className="flex flex-row items-center w-[81px] justify-center">
            <p className="font-sukhumvit text-[16px] text-[var(--color-font-gray)]">{item.numberOfDays}</p>
          </div>
          <div
            className={`flex flex-row bg-[#00000052] w-[65px] h-[26px] rounded-[16px] border justify-center items-center ${getStatusClass(
              item.status
            )}`}
          >
            <p className="font-sukhumvit text-[14px] text-center">{item.status}</p>
          </div>
          <div className="flex flex-row items-center w-[200px]">
            <p className="font-sukhumvit text-[16px] text-[var(--color-font-gray)]">{item.startDate}</p>
            <ArrowIcon className="fill-white" />
            <p className="font-sukhumvit text-[16px] text-[var(--color-font-gray)]">{item.endDate}</p>
          </div>
          <div className="flex flex-row items-center w-[65px] justify-end">
            <BinIcon className="fill-[var(--color-gray)] w-[24px] h-[24px] hover:fill-[#ED363F] transition-colors cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
}

export const LeaveList = ({ isOpen, onClose, data }: LeaveListProps): JSX.Element | null => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredData = selectedStatus
    ? leaveData.filter((item) => item.status === selectedStatus)
    : leaveData;

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-[var(--color-bg)] rounded-[8px] p-4 max-w-[900px] w-full max-h-[80vh] overflow-auto">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex flex-row justify-between">
            <p className="font-sukhumvit text-[20px] font-bold">{data.title}</p>
            <div
              className="flex flex-row items-center cursor-pointer group hover:text-white"
              onClick={onClose}
            >
              <CloseIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
            </div>
          </div>

          {/* Tabs */}
          <Tabs selectedStatus={selectedStatus} onSelect={setSelectedStatus} />

          {/* Table */}
          <LeavesTable data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default LeaveList;
