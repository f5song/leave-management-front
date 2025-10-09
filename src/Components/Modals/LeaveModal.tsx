import { ArrowIcon } from "@/Shared/Asseet/Icons";
import Table from "@/Components/Table/Table";
import StatusBadge from "@/Components/StatusBadge";
import TableHeadCell from "../Table/TableHeadCell";
import { useAuth } from "@/Context/AuthContext";
import { getLeaves } from "@/Api/leave-service";
import BaseModal from "@/Components/Modals/BaseModal";
import { StatusTabSection } from "./StatusTabSection";
import { PaginationSection } from "./PaginationSection";
import { usePaginatedQuery } from "@/Hooks/usePaginatedQuery";
import { getStatusLabel } from "@/Shared/utils/status";
import { formatDate } from "@/Shared/utils/dateUtils";
import { IItemRequest } from "@/Interfaces/item.interface";

interface LeaveModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    toggleModal: () => void
}

const LeaveModal: React.FC<LeaveModalProps> = ({ isOpen, onClose, title }) => {
  const { user } = useAuth();
  const limit = 9;
  const { data: leaves, pagination, isLoading, currentPage, setCurrentPage, selectedStatus, handleTabClick } =
    usePaginatedQuery({
      queryKeyBase: "leaves",
      fetchFn: (page, limit, status) =>
        getLeaves(page, limit, user?.id, status),
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
        </div>
      }
    >
      {/* Scrollable Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">กำลังโหลด...</div>
      ) : leaves.length === 0 ? (
        <div className="flex items-center justify-center h-[50vh] font-sukhumvit">ไม่พบประวัติการลา</div>
      ) : (
        <div className="overflow-x-auto rounded-[4px] flex-1">
          <Table.Container>
            <Table.Head>
              <TableHeadCell className="w-[120px]">ประเภทการลา</TableHeadCell>
              <TableHeadCell className="w-[200px]">สาเหตุ</TableHeadCell>
              <TableHeadCell className="w-[65px]">จำนวนวันลา</TableHeadCell>
              <TableHeadCell className="pl-9 w-[80px]">สถานะ</TableHeadCell>
              <TableHeadCell className="w-[120px]">วันที่ลา</TableHeadCell>
            </Table.Head>
            <Table.Body>
              {leaves.map((leave: IItemRequest, index: number) => (
                <Table.Row key={leave.id || index}>
                  <Table.Cell hasTopBorder={index !== 0}>{item.leaveType?.name || "-"}</Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>{item.reason || "-"}</Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>{item.totalDays ?? "-"} </Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <StatusBadge status={getStatusLabel(item.status)} />
                  </Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <span>{formatDate(item.startDate) ?? "-"}</span>
                      <ArrowIcon className="fill-white w-[15px] h-[15px]" />
                      <span>{formatDate(item.endDate) ?? "-"}</span>
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
