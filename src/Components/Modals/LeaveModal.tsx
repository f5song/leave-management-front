import { useState } from "react";
import {
  ArrowIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
} from "@/Shared/Asseet/Icons";
import Table from "@/Components/Table/Table";
import StatusBadge from "@/Components/StatusBadge";
import StatusTab from "@/Components/StatusTab";
import TableHeadCell from "../Table/TableHeadCell";
import { useAuth } from "@/Context/AuthContext";
import { getLeaves } from "@/Api/leave-service";
import { useQuery } from "@tanstack/react-query";

type LeaveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  toggleModal: () => void;
};

const LeaveModal: React.FC<LeaveModalProps> = ({ isOpen, onClose, title }) => {
  const { user } = useAuth();

  const statusTabs = [
    { label: "อนุมัติ", value: "APPROVED", color: "#34D399" },
    { label: "รออนุมัติ", value: "PENDING", color: "#6FA5F7" },
    { label: "ปฏิเสธ", value: "REJECTED", color: "#EF4444" },
  ];

  const [itemPerPage, setItemPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const limit = 9;

  const { data: leaves = { data: [], pagination: { totalItems: 0, totalPages: 1, page: 1, limit: 9 } }, isLoading, isError } = useQuery({
    queryKey: ["leaves", currentPage, user?.id, user?.role, selectedStatus],
    queryFn: () =>
      getLeaves(
        currentPage,
        limit,
        user?.id,
        selectedStatus ?? undefined
      ),
    enabled: !!user,
  });
  console.log("leaves", leaves);


  if (!isOpen) return null;
  if (isLoading) return <div>กำลังโหลด...</div>;
  if (isError) return <div>เกิดข้อผิดพลาดในการโหลดข้อมูล</div>;


  const handleTabClick = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(status);
    }
    setCurrentPage(1);
  };

  const totalPages = leaves?.pagination?.totalPages || 1;
  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(itemPerPage / 2), totalPages - itemPerPage + 1)
  );
  const endPage = Math.min(totalPages, startPage + itemPerPage - 1);

  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative bg-[var(--color-bg)] rounded-[8px] p-9 w-[75vw] max-w-[75vw] h-[85vh] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex flex-row justify-between">
          <p className="font-sukhumvit text-[20px] font-bold">{title}</p>
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
              onClick={() => handleTabClick(tab.value)}
            />
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-[4px] flex-1">
          <Table.Container>
            <Table.Head>
              <TableHeadCell width="w-[120px]">ประเภทการลา</TableHeadCell>
              <TableHeadCell width="w-[275px]" style={{ fontWeight: "bold" }}>
                สาเหตุ
              </TableHeadCell>
              <TableHeadCell width="w-[81px]" style={{ fontWeight: "bold" }}>
                จำนวนวันลา
              </TableHeadCell>
              <TableHeadCell width="w-[65px]">สถานะ</TableHeadCell>
              <TableHeadCell width="w-[120px]" style={{ fontWeight: "bold" }}>
                วันที่ลา
              </TableHeadCell>
            </Table.Head>

            <Table.Body>
              {leaves?.data?.map((item: any, index: number) => (
                <Table.Row key={item.id || index}>
                  <Table.Cell hasTopBorder={index !== 0}>
                    {item.leaveType?.name || "-"}
                  </Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    {item.description}
                  </Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    {item.totalDays}
                  </Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <StatusBadge status={statusTabs.find((s) => s.value === item.status)?.label || "-"} />
                  </Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <span>{item.startDate.split('T')[0]}</span>
                      <ArrowIcon className="fill-white w-[15px] h-[15px]" />
                      <span>{item.endDate.split('T')[0]}</span>
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Container>
        </div>

        {/* Footer + Pagination */}
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
