import { ComputerIcon } from "@/Shared/Asseet/Icons";
import { useProfileData } from "@/Hooks/useProfileData";
import { formatDateTime } from "@/Shared/utils/dateUtils";
import HistoryCard from "../HistoryCard";
import { useAuth } from "@/Context/AuthContext";
import { IPaginatedResponse } from "@/Interfaces/hooks.interface";
import { IItemRequest } from "@/Interfaces/item.interface";

interface ItemProps {
  toggleItemsModal: () => void;
}

const ItemsHistory: React.FC<ItemProps> = ({ toggleItemsModal }) => {
  const page = 1;
  const limit = 4;
  const { user } = useAuth();

  // type-safe call to useProfileData
  const { itemsRequest } = useProfileData(page, limit, user?.id) as {
    itemsRequest?: IPaginatedResponse<IItemRequest>;
  };

  const items = itemsRequest?.data ?? [];

  return (
    <HistoryCard
      title="ประวัติยืมอุปกรณ์"
      icon={
        <ComputerIcon className="fill-[#DCDCDC] group-hover:fill-white transition-colors" />
      }
      onViewAll={toggleItemsModal}
    >
      {items.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-[#DCDCDC] font-sukhumvit">
            ไม่พบประวัติยืมอุปกรณ์
          </p>
        </div>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between"
          >
            <div className="w-[232px]">
              <p className="font-sukhumvit text-[16px] text-white">
                {item.item.name}
              </p>
            </div>
            <div className="w-[68px]">
              <p className="font-sukhumvit-semibold text-[14px] text-white">
                จำนวน {item.quantity}
              </p>
            </div>
            <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">
              {formatDateTime(item.createdAt)}
            </p>
          </div>
        ))
      )}
    </HistoryCard>
  );
};

export default ItemsHistory;
