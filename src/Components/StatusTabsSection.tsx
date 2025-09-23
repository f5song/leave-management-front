import StatusTab from "./StatusTab";
import { STATUS_REQUEST } from "@/Shared/Constants/status";

export const StatusTabsSection = ({
    selectedStatus,
    onTabClick
}: {
    selectedStatus: string | null;
    onTabClick: (status: string) => void;
}) => (
    <div className="flex flex-row gap-2 sm:gap-4 py-5">
        {STATUS_REQUEST.map((tab) => (
            <StatusTab
                key={tab.value}
                tab={tab}
                selected={selectedStatus === tab.value}
                onClick={() => onTabClick(tab.value)}
            />
        ))}
    </div>
);