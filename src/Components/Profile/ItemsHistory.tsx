import { ComputerIcon } from "@/Shared/Asseet/Icons";
import { useProfileData } from "@/Hook/useProfileData";
import { formatDateTime } from "@/Shared/utils/dateUtils";
import HistoryCard from "../HistoryCard";
import { useAuth } from "@/Context/AuthContext";

type Props = { toggleItemsModal: () => void };

const ItemsHistory = ({ toggleItemsModal }: Props) => {
    const page = 1;
    const limit = 4;
    const { user } = useAuth();
    const { itemsRequest } = useProfileData(page, limit, user?.id);

    return (
        <HistoryCard
            title="ประวัติยืมอุปกรณ์"
            icon={<ComputerIcon className="fill-[#DCDCDC] group-hover:fill-white transition-colors" />}
            onViewAll={toggleItemsModal}
        >
            {itemsRequest?.data?.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                    <p className="text-[#DCDCDC] font-sukhumvit">ไม่พบประวัติยืมอุปกรณ์</p>
                </div>
            ) : (
                itemsRequest?.data?.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between"
                    >
                    <div className="w-[232px]">
                        <p className="font-sukhumvit text-[16px] text-white">{item.item.name}</p>
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
