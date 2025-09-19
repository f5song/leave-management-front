import { ComputerIcon } from "@/Shared/Asseet/Icons";
import { useProfileData } from "@/Hook/useProfileData";
import { formatDateTime } from "@/Shared/utils/dateUtils";

type Props = { toggleItemsModal: () => void };

const ItemsHistory = ({ toggleItemsModal }: Props) => {

    const { itemsRequest } = useProfileData()

    return (
        <div className="flex flex-col">
            <div className="flex flex-row w-full max-w-6xl rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
                <div className="flex flex-col w-full py-5 px-5">
                    <div className="flex flex-row justify-between">
                        <p className="font-sukhumvit text-[20px] font-bold">ประวัติยืมอุปกรณ์</p>
                        <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={toggleItemsModal}>
                            <ComputerIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
                            <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">ดูทั้งหมด</p>
                        </div>
                    </div>
                    {itemsRequest?.data?.map((item, index) => (
                        <div key={index} className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between">
                            <div className="w-[232px]"><p className="font-sukhumvit text-[16px] text-white">{item.item.name}</p></div>
                            <div className="w-[68px]"><p className="font-sukhumvit-semibold text-[14px] text-white">จำนวน {item.quantity}</p></div>
                            <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{formatDateTime(item.createdAt)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItemsHistory;
