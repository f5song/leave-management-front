import BackgroundGradient from "@/Components/BackgroundGradient";
import { DeviceFilters } from "@/Components/Device/DeviceFilters";
import { DeviceGrid } from "@/Components/Device/DeviceGrid";
import ItemsModal from "@/Components/Modals/ItemsModal";
import Navbar from "@/Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FilterValue } from "@/Shared/Constants/status";
import { useDeviceData } from "@/Hook/useDeviceData";
import { useAuth } from "@/Context/AuthContext";
import { DeviceRequestHistory } from "@/Components/Device/RequestHistoryPanel";
import Header from "@/Components/Header";
import ContentCard from "@/Components/ContentCard";

const Device = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // State
  const [isDeviceModalOpen, setDeviceModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterValue>("ALL");

  const itemPerPage = 9;
  const currentPage = 1;

  // Data fetching
  const { itemsStock } = useDeviceData(
    user,
    isLoading,
    currentPage,
    itemPerPage
  );

  // Computed values
  const filteredItems = filter === "ALL"
    ? itemsStock
    : itemsStock.filter((item) => item.status === filter);

  // Event handlers
  const toggleDeviceModal = () => setDeviceModalOpen(prev => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
      {/* Modal */}
      <ItemsModal
        isOpen={isDeviceModalOpen}
        onClose={() => setDeviceModalOpen(false)}
        data={{ title: "ประวัติยืมอุปกรณ์" }}
      />

      {/* Navigation */}
      <Navbar onClick={() => navigate("/home")} />
      <BackgroundGradient />

      <div className="flex flex-col pt-5">
        <Header title="อุปกรณ์" />

        <div className="flex flex-col xl:flex-row gap-5">
          {/* Left Panel */}
          <ContentCard>
            <DeviceFilters filter={filter} onFilterChange={setFilter} />
            <DeviceGrid devices={filteredItems} />
          </ContentCard>

          {/* Right Panel */}
          <DeviceRequestHistory toggleDeviceModal={toggleDeviceModal} />
        </div>
      </div>


    </div>

  );
};
export default Device;