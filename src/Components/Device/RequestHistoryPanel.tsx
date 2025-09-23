import { useProfileData } from "@/Hook/useProfileData";
import HistoryCard from "../HistoryCard";
import { CalendarIcon } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { STATUS_REQUEST } from "@/Shared/Constants/status";
import { formatDateTime } from "@/Shared/utils/dateUtils";
import { useAuth } from "@/Context/AuthContext";

type Props = { toggleDeviceModal: () => void };

export const DeviceRequestHistory = ({ toggleDeviceModal }: Props) => {
  const { user } = useAuth();
  const page = 1;
  const limit = 8;
  const { itemsRequest } = useProfileData(page, limit, user?.id);

  return (
    <HistoryCard
      title="ประวัติการยืมอุปกรณ์"
      icon={
        <CalendarIcon className="w-[15px] h-[15px] text-[#DCDCDC] group-hover:text-white transition-colors" />
      }
      onViewAll={toggleDeviceModal}
    >
      {itemsRequest?.data?.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-400 font-sukhumvit">ไม่พบประวัติการยืมอุปกรณ์</p>
        </div>
      ) : (
        itemsRequest?.data?.map((item, index) => {
          const isLast = index === itemsRequest.data.length - 1;
          return (
            <div
              key={index}
              className={`flex flex-row border-b ${
                !isLast ? "border-[#676767]" : "border-transparent"
              } pt-3 pb-1 justify-between items-center`}
            >
              <div className="w-[120px] flex-shrink-0">
                <img
                  className="w-[92px] h-[52px] rounded-[4px] object-cover"
                  src={item.image || "/default-item.png"}
                  alt={item.item?.name || "Item"}
                  onError={(e) => {
                    e.currentTarget.src = "/default-item.png";
                  }}
                />
              </div>
              <div className="w-[170px] flex flex-col min-w-0 pl-2 pr-3">
                <p className="font-sukhumvit text-[14px] text-white truncate">
                  {item.item?.name || "Unknown Item"}
                </p>
                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] truncate">
                  {item.requestedBy?.firstName} {item.requestedBy?.lastName}
                </p>
              </div>
              <div className="flex flex-row items-center w-[168px] justify-end">
                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)] mr-2">
                  {item.createdAt ? formatDateTime(item.createdAt) : "-"}
                </p>
                <StatusBadge
                  status={
                    STATUS_REQUEST.find((s) => s.value === item.status)?.label ??
                    item.status
                  }
                />
              </div>
            </div>
          );
        })
      )}
    </HistoryCard>
  );
};
