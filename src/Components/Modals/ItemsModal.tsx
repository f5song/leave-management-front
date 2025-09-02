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
import TableHeadCell from "../Table/TableHeadCell";

type ItemsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
  };
  toggleModal: () => void;
};

const ItemsModal: React.FC<ItemsModalProps> = ({ isOpen, onClose, data }) => {

  const itemsData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: "MACBOOK",
    employeeName: "งูพิษชยา แซวมอล",
    status: "อนุมัติ",
    dateTime: "2025-07-21 12:00",
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
    ? itemsData.filter((item) => item.status === selectedStatus)
    : itemsData;
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
            {/* ทำเป็นทีละ row เหมือน body*/}
            <Table.Head>
                <TableHeadCell width="w-[600px]">อุปกรณ์ที่ขอยืม</TableHeadCell>
                <TableHeadCell width="w-[300px]">พนักงานที่ยืม</TableHeadCell>
                <TableHeadCell width="w-[90px]">สถานะ</TableHeadCell>
                <TableHeadCell width="w-[200px]">วันที่ยืม</TableHeadCell>
            </Table.Head>

            <Table.Body>
              {paginatedData.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell hasTopBorder={index !== 0}>{item.name}</Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>{item.employeeName}</Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <StatusBadge status={item.status} />
                  </Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <span>{item.dateTime}</span>
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

export default ItemsModal;
