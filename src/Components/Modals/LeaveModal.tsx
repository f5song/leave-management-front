import { useState } from "react";
import {
  ArrowIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
} from "@/Shared/Asseet/Icons";
import Table from "@/Components/Table/Table";
import TableHead from "@/Components/Table/TableHead";
import StatusBadge from "@/Components/StatusBadge";
import StatusTab from "@/Components/StatusTab";

type LeaveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
  };
  toggleModal: () => void;
};

const LeaveModal: React.FC<LeaveModalProps> = ({ isOpen, onClose, data }) => {

  const leaveData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
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
      <div className="relative bg-[var(--color-bg)] rounded-[8px] p-9 w-[75vw] max-w-[75vw] h-[85vh] max-h-[85vh] flex flex-col">
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
            <StatusTab
              key={tab.value}
              tab={tab}
              selected={selectedStatus === tab.value}
              onClick={handleTabClick}
            />
          ))}
        </div>

        {/* <div className="overflow-x-auto rounded-[4px]">
          <table className="w-full table-fixed border-separate border-spacing-0">
            <TableHead columns={columns} />
            <TableBody data={paginatedData} getStatusClass={getStatusClass} />
          </table>
        </div> */}

        <div className="overflow-x-auto rounded-[4px]">


          <Table.Container>
            <Table.Head
              columns={[
                {
                  label: "ลาพักร้อน/ลาป่วย/ลากิจ",
                  width: "w-[120px]",
                  className: "text-left",
                },
                {
                  label: "สาเหตุ",
                  width: "w-[275px]",
                  className: "text-left",
                  style: { fontWeight: "bold" },
                },
                {
                  label: "จำนวนวันลา",
                  width: "w-[81px]",
                  className: "text-left",
                  style: { fontWeight: "bold" },
                },
                {
                  label: "สถานะ",
                  width: "w-[65px]",
                  className: "text-left",
                },
                {
                  label: "วันที่ลา",
                  width: "w-[120px]",
                  className: "text-left",
                  style: { fontWeight: "bold" },
                },
              ]}
            />

            <Table.Body>
              {paginatedData.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell hasTopBorder={index !== 0}>{item.leaveType}</Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>{item.reason}</Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>{item.numberOfDays}</Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <StatusBadge status={item.status} />
                  </Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <span>{item.startDate}</span>
                      <ArrowIcon className="fill-white w-[15px] h-[15px]" />
                      <span>{item.endDate}</span>
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>


          </Table.Container>

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

export default LeaveModal;
