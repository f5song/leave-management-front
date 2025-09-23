import { ArrowIcon } from "@/Shared/Asseet/Icons";
import Table from "@/Components/Table/Table";
import StatusBadge from "@/Components/StatusBadge";
import TableHeadCell from "../Table/TableHeadCell";
import { useAuth } from "@/Context/AuthContext";
import { getLeaves } from "@/Api/leave-service";
import BaseModal from "@/Components/Modals/BaseModal";
import { StatusTabSection } from "./StatusTabSection";
import { PaginationSection } from "./PaginationSection";
import { usePaginatedQuery } from "@/Hook/usePaginatedQuery";
import { getStatusLabel } from "@/Shared/utils/status";

type LeaveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  scope: "dashboard" | "profile";
};


const LeaveModal: React.FC<LeaveModalProps> = ({ isOpen, onClose, title, scope }) => {
  const { user } = useAuth();
  const limit = 9;
  const { data: leaves, pagination, isLoading, isError, currentPage, setCurrentPage, selectedStatus, handleTabClick } =
    usePaginatedQuery({
      queryKeyBase: "leaves",
      fetchFn: (page, limit, status) =>
        scope === "dashboard"
          ? getLeaves(page, limit, undefined, "APPROVED")
          : getLeaves(page, limit, user?.id, status),
      limit,
      user,
    });

  if (!isOpen) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      statusTab={
        <StatusTabSection
          selectedStatus={selectedStatus}
          onTabClick={handleTabClick}
        />
      }
      footer={
        <div className="mt-4 flex justify-between items-center">
          <PaginationSection
            currentPage={Number(pagination.page) || currentPage}
            totalPages={Number(pagination.totalPages) || 1}
            onPageChange={(p) => setCurrentPage(p)}
          />
          <button
            className="text-[var(--color-primary)] font-bold font-sukhumvit"
            onClick={onClose}
          >
            ปิด
          </button>
        </div>
      }
    >
      {/* Scrollable Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">กำลังโหลด...</div>
      ) : isError ? (
        <div className="flex items-center justify-center h-64">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
      ) : (
        <div className="overflow-x-auto rounded-[4px] flex-1">
          <Table.Container>
            <Table.Head>
              <TableHeadCell width="w-[120px]">ประเภทการลา</TableHeadCell>
              <TableHeadCell width="w-[275px]">สาเหตุ</TableHeadCell>
              <TableHeadCell width="w-[81px]">จำนวนวันลา</TableHeadCell>
              <TableHeadCell width="w-[65px]">สถานะ</TableHeadCell>
              <TableHeadCell width="w-[120px]">วันที่ลา</TableHeadCell>
            </Table.Head>
            <Table.Body>
              {leaves.map((item: any, index: number) => (
                <Table.Row key={item.id || index}>
                  <Table.Cell hasTopBorder={index !== 0}>{item.leaveType?.name || "-"}</Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>{item.description || "-"}</Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>{item.totalDays ?? "-"}</Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <StatusBadge status={getStatusLabel(item.status)} />
                  </Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <span>{item.startDate?.split?.("T")?.[0] ?? "-"}</span>
                      <ArrowIcon className="fill-white w-[15px] h-[15px]" />
                      <span>{item.endDate?.split?.("T")?.[0] ?? "-"}</span>
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Container>
        </div>
      )}
    </BaseModal>

  );
};

export default LeaveModal;
