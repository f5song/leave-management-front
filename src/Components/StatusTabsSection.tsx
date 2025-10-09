import StatusTab from "./StatusTab";
import { STATUS_FILTERS } from "@/Shared/Constants/status";

interface StatusTabsSectionProps {
    selectedStatus: string | null;
    onTabClick: (status: string) => void;
}

export const StatusTabsSection = ({
    selectedStatus,
    onTabClick
}: StatusTabsSectionProps) => (
    <div className="flex flex-row gap-2 sm:gap-4 py-5">
        {STATUS_FILTERS.map((tab) => (
            <StatusTab
                key={tab.value}
                tab={tab}
                selected={selectedStatus === tab.value}
                onClick={() => onTabClick(tab.value)}
            />
        ))}
    </div>
);