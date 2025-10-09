import BackgroundGradient from "@/Components/BackgroundGradient";
import { DeviceFilters } from "@/Components/Device/DeviceFilters";
import Navbar from "@/Components/Navbar";
import { useState } from "react";
import { FilterValue } from "@/Shared/Constants/status";
import { useDeviceData } from "@/Hooks/useDeviceData";
import { useAuth } from "@/Context/AuthContext";
import { DeviceRequestHistory } from "@/Components/Device/RequestHistoryPanel";
import Header from "@/Components/Header";
import ContentCard from "@/Components/ContentCard";

const Device = () => {
  const { user, isLoading } = useAuth();

  // State
  const [filter, setFilter] = useState<FilterValue>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch data
  const { itemsStock, isLoadingStock } = useDeviceData({
    user,
    isLoading,
    currentPage,
    itemsPerPage,
    filter: filter !== 'ALL' ? filter : undefined,
  });

  return (
    <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
      <Navbar />
      <BackgroundGradient />

      <div className="flex flex-col pt-5">
        <Header title="อุปกรณ์" />

        <div className="flex flex-col xl:flex-row gap-5">
          <ContentCard>
            <DeviceFilters
              filter={filter}
              onFilterChange={(f) => { setFilter(f); setCurrentPage(1); }}
            />

            <DeviceRequestHistory
              itemsStockData={itemsStock}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)} // wrap ให้ตรง type
              isLoading={isLoadingStock}
            />

          </ContentCard>
        </div>
      </div>
    </div>
  );
};

export default Device;
