import StatusBadge from "../StatusBadge";
import { formatDate } from "@/Shared/utils/dateUtils";
import { PaginationSection } from "../Modals/PaginationSection";
import { getStatusLabelFilter } from "@/Shared/utils/status";
import PrimaryButton from "../PrimaryButton";
import { IItem } from "@/Interfaces/item.interface";
import { IPaginatedResponse } from "@/Interfaces/hooks.interface";

export interface DeviceRequestHistoryProps {
  itemsStockData: IPaginatedResponse<IItem>; // ใช้ structure ของ paginated data
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const DeviceRequestHistory: React.FC<DeviceRequestHistoryProps> = ({
  itemsStockData,
  currentPage,
  onPageChange,
  isLoading = false,
}) => {
  const itemsStock = itemsStockData?.data ?? [];
  const pagination = itemsStockData?.pagination ?? { totalPages: 1, totalItems: 0, page: currentPage, limit: 5 };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-400 font-sukhumvit">Loading...</p>
      </div>
    );
  }

  if (itemsStock.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-400 font-sukhumvit">ไม่พบประวัติการยืมอุปกรณ์</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {itemsStock.map((item) => (
        <div
          key={item.id || item.name}
          className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between items-center"
        >
          <div className="flex flex-row items-center">
            <img
              className="w-[92px] h-[52px] rounded-[4px] object-cover"
              src={item.image || "/default-item.png"}
              alt={item.name || "Item"}
              onError={(e) => { e.currentTarget.src = "/default-item.png"; }}
            />
            <div className="flex flex-col min-w-0 pl-2 pr-3">
              <p className="font-sukhumvit text-[16px] text-white">{item.name || "Unknown Item"}</p>
              <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] truncate">{item.description || "-"}</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end gap-2">
            <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] mr-2">
              {item.createdAt ? formatDate(item.createdAt) : "-"}
            </p>
            <StatusBadge status={getStatusLabelFilter(item.status)} />
            <PrimaryButton disabled={item.status !== "AVAILABLE"}>
              กดยืม
            </PrimaryButton>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <PaginationSection
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
          itemPerPage={pagination.limit} // ใช้ค่า limit จาก pagination จริง
        />
      </div>
    </div>
  );
};
