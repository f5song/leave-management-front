// components/StatusTab.tsx
import React from "react";

type TabType = {
  label: string;
  value: string;
  color: string;
};

type Props = {
  tab: TabType;
  selected: boolean;
  onClick: (value: string) => void;
};

const StatusTab: React.FC<Props> = ({ tab, selected, onClick }) => {
  return (
    <div
      onClick={() => onClick(tab.value)}
      className={`rounded-[4px] w-full h-[33px] bg-[#00000052] flex items-center justify-center cursor-pointer border ${
        selected
          ? `text-[${tab.color}] border-[${tab.color}]`
          : "text-[var(--color-gray)] border-transparent hover:text-white"
      } transition-colors`}
    >
      <p className="font-sukhumvit text-[16px] font-bold">{tab.label}</p>
    </div>
  );
};

export default StatusTab;
