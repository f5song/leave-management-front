import { FilterValue } from "@/Shared/Constants/status";
import { STATUS_FILTERS } from "@/Shared/Constants/status";

export const DeviceFilters = ({ filter, onFilterChange }: { 
    filter: FilterValue; 
    onFilterChange: (filter: FilterValue) => void;
  }) => (
    <div className="flex flex-row bg-[#00000052] rounded-[8px] w-[50%] gap-1 p-1 mb-4">
      {STATUS_FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`font-sukhumvit-bold text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] rounded-[4px] py-2 px-1 sm:px-2 transition flex-1 min-w-0 ${
            filter === f.value
              ? "bg-[#FFD000] text-[#000000]"
              : "text-[#FFD000] hover:bg-[#FFD00022]"
          }`}
        >
          <span className="block truncate text-center">{f.label}</span>
        </button>
      ))}
    </div>
  );