import { useState } from "react";
import {
  ArrowIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
} from "@/Shared/Asseet/Icons";
import TableHead from "./Table/TableHead";
import TableBody from "./Table/TableBody";

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

  const columns = [
    "ประเภท",
    "สาเหตุ",
    "จำนวนวันลา",
    "สถานะ",
    "วันที่ลา",
  ];

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
      <div className="relative bg-[var(--color-bg)] rounded-[8px] p-9 w-full max-w-[120vh] h-[80vh] max-h-[80vh] flex flex-col">
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
              className={`rounded-[4px] w-full h-[33px] bg-[#00000052] flex items-center justify-center cursor-pointer border ${selectedStatus === tab.value
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

        {/* <div className="overflow-x-auto rounded-[4px]">
          <table className="w-full table-fixed border-separate border-spacing-0">
            <TableHead columns={columns} />
            <TableBody data={paginatedData} getStatusClass={getStatusClass} />
          </table>
        </div> */}

        <div className="overflow-x-auto rounded-[4px]">
          <table className="min-w-[1008px] w-full table-fixed border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-[#00000052] h-[54px] font-sukhumvit text-white text-left">
                <th className="px-4">ลาพักร้อน/ลาป่วย/ลากิจ</th>
                <th className="px-4">สาเหตุ</th>
                <th className="px-4">จำนวนวันลา</th>
                <th className="px-4">สถานะ</th>
                <th className="px-4">วันที่ลา</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className="text-[var(--color-font-gray)] font-sukhumvit">
                  <td className={`px-4 ${index !== 0 ? 'border-t border-[#444] pt-2' : ''}`}>{item.leaveType}</td>
                  <td className={`px-4 ${index !== 0 ? 'border-t border-[#444] pt-2' : ''}`}>{item.reason}</td>
                  <td className={`px-4 ${index !== 0 ? 'border-t border-[#444] pt-2' : ''}`}>{item.numberOfDays}</td>
                  <td className={`px-4 ${index !== 0 ? 'border-t border-[#444] pt-2' : ''}`}>
                    <span
                      className={`flex items-center justify-center text-[14px] bg-[#00000052] w-[65px] h-[26px] rounded-[16px] border ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className={`px-4 ${index !== 0 ? 'border-t border-[#444] pt-2' : ''}`}>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <span>{item.startDate}</span>
                      <ArrowIcon className="fill-white w-[15px] h-[15px]" />
                      <span>{item.endDate}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-9 pb-9">
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
                className={`px-3 py-1 rounded-[4px] text-[16px] font-sukhumvit font-semibold ${currentPage === page
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
            className="text-[var(--color-primary)] font-bold font-sukhumvit"
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
