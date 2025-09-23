import StatusTab from "@/Components/StatusTab";

export const statusTabs = [
  { label: "อนุมัติ", value: "APPROVED", color: "#34D399" },
  { label: "รออนุมัติ", value: "PENDING", color: "#6FA5F7" },
  { label: "ปฏิเสธ", value: "REJECTED", color: "#EF4444" },
];

type StatusTabSectionProps = {
  selectedStatus: string | null;
  onTabClick: (status: string) => void;
};

export const StatusTabSection: React.FC<StatusTabSectionProps> = ({ selectedStatus, onTabClick }) => (
  <div className="flex flex-row gap-4 p-5">
    {statusTabs.map((tab) => (
      <StatusTab
        key={tab.value}
        tab={tab}
        selected={selectedStatus === tab.value}
        onClick={() => onTabClick(tab.value)}
      />
    ))}
  </div>
);

