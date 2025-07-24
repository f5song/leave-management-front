import { useState } from "react";
import {
  ArrowIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
} from "@/Shared/Asseet/Icons";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
  };
};

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, data }) => {
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

  const leaveData = Array.from({ length: 50 }, (_, i) => ({
    leaveType: "ลาพักร้อน",
    reason: `ลาไปทำธุระ ${i + 1}`,
    numberOfDays: "1 วัน",
    status: i % 3 === 0 ? "รออนุมัติ" : i % 3 === 1 ? "อนุมัติ" : "ปฏิเสธ",
    startDate: "2025-07-21",
    endDate: "2025-07-21",
  }));

  const statusTabs = [
    { label: "อนุมัติ", value: "อนุมัติ", color: "#34D399" },
    { label: "รออนุมัติ", value: "รออนุมัติ", color: "#6FA5F7" },
    { label: "ปฏิเสธ", value: "ปฏิเสธ", color: "#EF4444" },
  ];

  const itemPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredData = selectedStatus
    ? leaveData.filter((item) => item.status === selectedStatus)
    : leaveData;
  const totalPages = Math.ceil(filteredData.length / itemPerPage);

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const pageLimit = 5;
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(pageLimit / 2),
      totalPages - pageLimit + 1
    )
  );
  const endPage = Math.min(totalPages, startPage + pageLimit - 1);

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handleTabClick = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(status);
    }
    setCurrentPage(1);
  };

  if (!isOpen) return null;

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative bg-[var(--color-bg)] rounded-[8px] p-9 w-full max-w-[1080px] h-[75vh] max-h-[756px] flex flex-col">
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
        <div className="flex flex-row gap-4 py-5">
          {statusTabs.map((tab) => (
            <div
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              className={`rounded-[4px] w-full h-[33px] bg-[#00000052] flex items-center justify-center cursor-pointer border ${
                selectedStatus === tab.value
                  ? `text-[${tab.color}] border-[${tab.color}]`
                  : "text-[var(--color-gray)] border-transparent hover:text-white"
              } transition-colors`}
            >
              <p className="font-sukhumvit text-[16px] font-bold">
                {tab.label}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Table Head */}
          <div className="flex flex-row gap-5 bg-[#00000052] rounded-[4px] h-[54px] items-center px-4">
            <p className="text-white font-bold w-[162px] font-sukhumvit">ประเภท</p>
            <p className="text-white font-bold w-[344px] font-sukhumvit">สาเหตุ</p>
            <p className="text-white font-bold w-[81px] font-sukhumvit">จำนวนวันลา</p>
            <p className="text-white font-bold w-[65px] font-sukhumvit">สถานะ</p>
            <p className="text-white font-bold w-[200px] font-sukhumvit">วันที่ลา</p>
          </div>

          {/* Table Body */}
          {paginatedData.map((item, index) => (
            <div
              key={index}
              className="flex flex-row border-b border-[#676767] px-4 py-[10px] gap-5"
            >
              <div className="w-[162px]">
                <p className="text-white font-sukhumvit">{item.leaveType}</p>
              </div>
              <div className="w-[344px]">
                <p className="text-[var(--color-font-gray)] font-sukhumvit">{item.reason}</p>
              </div>
              <div className="w-[81px] text-center">
                <p className="text-[var(--color-font-gray)] font-sukhumvit">
                  {item.numberOfDays}
                </p>
              </div>
              <div
                className={`bg-[#00000052] w-[65px] h-[26px] rounded-[16px] border flex items-center justify-center ${getStatusClass(
                  item.status
                )}`}
              >
                <p className="text-[14px] text-center font-sukhumvit">{item.status}</p>
              </div>
              <div className="w-[200px] flex items-center gap-1">
                <p className="text-[var(--color-font-gray)] font-sukhumvit">
                  {item.startDate}
                </p>
                <ArrowIcon className="fill-white" />
                <p className="text-[var(--color-font-gray)] font-sukhumvit">{item.endDate}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between pt-5">
          {/* Pagination */}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-white disabled:opacity-30"
            >
              <ArrowLeftIcon className="w-[24px] h-[24px] fill-white" />
            </button>

            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-[4px] text-[16px] font-sukhumvit font-semibold ${
                  currentPage === page
                    ? "border border-white text-white"
                    : "text-[var(--color-gray)]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="text-white disabled:opacity-30"
            >
              <ArrowRightIcon className="w-[24px] h-[24px] fill-white" />
            </button>
          </div>

          <button
            className="text-[var(--color-primary)] font-bold"
            onClick={onClose}
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
