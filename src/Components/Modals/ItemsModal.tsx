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
import { useQuery } from "@tanstack/react-query";
import { getItemsRequest } from "@/Api/items-requests-service";
import { useAuth } from "@/Context/AuthContext";

type ItemsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
  };
  toggleModal: () => void;
};

const ItemsModal: React.FC<ItemsModalProps> = ({ isOpen, onClose, data }) => {

  const { user, isLoading } = useAuth();

  const statusTabs = [
    { label: "อนุมัติ", value: "APPROVED", color: "#34D399" },
    { label: "รออนุมัติ", value: "PENDING", color: "#6FA5F7" },
    { label: "ปฏิเสธ", value: "REJECTED", color: "#EF4444" },
  ];


  const [itemPerPage, setItemPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  console.log("selectedStatus", selectedStatus);

  const handleTabClick = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(status);
    }
    setPage(1);
  };

  //query
  //item request
  const { data: itemsRequest = { data: [], pagination: { totalItems: 0, totalPages: 1, page: 1, limit: 9 } } } = useQuery({
    queryKey: ['items-request', user?.role || 'guest', currentPage, selectedStatus],
    queryFn: async () => {
      if (!user || isLoading) {
        return { data: [], pagination: { totalItems: 0, totalPages: 1, page: 1, limit: 9 } };
      }
      if (user.role === 'admin') {
        const response = await getItemsRequest(currentPage, itemPerPage,selectedStatus ?? undefined);
        return response;
      } else {
        const response = await getItemsRequest(currentPage, itemPerPage,user.id,selectedStatus ?? undefined);
        return response;
      }
    },
    enabled: !!user && !isLoading,
  });

  console.log("totalPages", itemsRequest?.pagination?.totalPages);
  const totalPages = itemsRequest?.pagination?.totalPages || 1;
  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(itemPerPage / 2), totalPages - itemPerPage + 1)
  );
  const endPage = Math.min(totalPages, startPage + itemPerPage - 1);

  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

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
              onClick={() => handleTabClick(tab.value)}
            />
          ))}
        </div>
        <div className="overflow-x-auto rounded-[4px]">
          <Table.Container>
            <Table.Head>
              <TableHeadCell width="w-[600px]">อุปกรณ์ที่ขอยืม</TableHeadCell>
              <TableHeadCell width="w-[250px]">พนักงานที่ยืม</TableHeadCell>
              <TableHeadCell width="w-[100px]">สถานะ</TableHeadCell>
              <TableHeadCell width="w-[200px]">วันที่ยืม</TableHeadCell>
            </Table.Head>

            <Table.Body>
              {itemsRequest?.data?.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell hasTopBorder={index !== 0}>{item.item.name}</Table.Cell>
                    <Table.Cell hasTopBorder={index !== 0}>{item.requestedBy.firstName + " " + item.requestedBy.lastName}</Table.Cell>
                    <Table.Cell hasTopBorder={index !== 0}>
                      <StatusBadge
                        status={statusTabs.find(s => s.value === item.status)?.label ?? item.status}
                      />
                    </Table.Cell>
                    <Table.Cell hasTopBorder={index !== 0}>
                      <span className="inline-flex items-center gap-1 whitespace-nowrap">
                        <span>{item.createdAt.split('T')[0] + " " + item.createdAt.split('T')[1].split(':')[0] + ":" + item.createdAt.split('T')[1].split(':')[1]}</span>
                      </span>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
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
