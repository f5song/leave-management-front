import Table from "@/Components/Table/Table";
import TableHeadCell from "../Table/TableHeadCell";
import StatusBadge from "@/Components/StatusBadge";
import BaseModal from "./BaseModal";
import { StatusTabSection } from "./StatusTabSection";
import { PaginationSection } from "./PaginationSection";
import { useAuth } from "@/Context/AuthContext";
import { getItemsRequest } from "@/Api/items-requests-service";
import { usePaginatedQuery } from "@/Hooks/usePaginatedQuery";
import { getStatusLabel } from "@/Shared/utils/status";
import { IItem, IItemRequest } from "@/Interfaces/item.interface";

interface ItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: { title: string };
}

const ItemsModal: React.FC<ItemsModalProps> = ({ isOpen, onClose, data }) => {
  const { user } = useAuth();
  const {
    data: items,
    pagination,
    isLoading,
    currentPage,
    setCurrentPage,
    selectedStatus,
    handleTabClick,
  } = usePaginatedQuery({
    queryKeyBase: "items-request",
    fetchFn: async (page, limit, status) => {
      return getItemsRequest(page, limit, user?.id, status);
    },
    limit: 9,
    user,
  });

  if (!isOpen) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={data.title}
      statusTab={<StatusTabSection selectedStatus={selectedStatus} onTabClick={handleTabClick} />}
      footer={
        <div className="mt-4 flex justify-between items-center">
          <PaginationSection
            currentPage={Number(pagination.page) || currentPage}
            totalPages={Number(pagination.totalPages) || 1}
            onPageChange={setCurrentPage}
          />
        </div>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-64">กำลังโหลด...</div>
      ) : items.length === 0 ? (
        <div className="flex items-center justify-center h-[50vh] font-sukhumvit">ไม่พบประวัติยืมอุปกรณ์</div>
      ) : (
        <div className="overflow-x-auto rounded-[4px] flex-1">
          <Table.Container>
            <Table.Head>
              <TableHeadCell width="w-[600px]">อุปกรณ์ที่ขอยืม</TableHeadCell>
              <TableHeadCell width="w-[250px]">พนักงานที่ยืม</TableHeadCell>
              <TableHeadCell width="w-[100px]">สถานะ</TableHeadCell>
              <TableHeadCell width="w-[200px]">วันที่ยืม</TableHeadCell>
            </Table.Head>
            <Table.Body>
              {items.map((item: IItemRequest, index: number) => (
                <Table.Row key={item.id || index}>
                  <Table.Cell hasTopBorder={index !== 0}>{item.item.name}</Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    {item.requestedBy.firstName} {item.requestedBy.lastName}
                  </Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <StatusBadge status={getStatusLabel(item.status)} />
                  </Table.Cell>
                  <Table.Cell hasTopBorder={index !== 0}>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <span>
                        {item.createdAt.split("T")[0]}{" "}
                        {item.createdAt.split("T")[1].split(":")[0]}:
                        {item.createdAt.split("T")[1].split(":")[1]}
                      </span>
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

export default ItemsModal;
