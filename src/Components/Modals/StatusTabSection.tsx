import StatusTab from "@/Components/StatusTab";
import { STATUS_TABS } from "@/Shared/Constants/status";

interface StatusTabSectionProps {
    selectedStatus: string | null;
    onTabClick: (status: string) => void;
}

export const StatusTabSection: React.FC<StatusTabSectionProps> = ({ selectedStatus, onTabClick }) => (
  <div className="flex flex-row gap-4 p-5">
    {STATUS_TABS.map((tab) => (
      <StatusTab
        key={tab.value}
        tab={tab}
        selected={selectedStatus === tab.value}
        onClick={() => onTabClick(tab.value)}
      />
    ))}
  </div>
);

