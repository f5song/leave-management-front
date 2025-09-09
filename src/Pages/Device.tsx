import BackgroundGradient from "@/Components/BackgroundGradient";
import Navbar from "@/Components/Navbar";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import { useNavigate } from "react-router-dom";
import SelectField from "@/Components/SelectField";
import { ArrowIcon, BackIcon, CalendarIcon, ComputerIcon, EditIcon } from "@/Shared/Asseet/Icons";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import LeaveModal from "@/Components/Modals/LeaveModal";
import FacilitiesModal from "@/Components/Modals/FacilitiesModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StatusBadge from "@/Components/StatusBadge";
import DeviceCard from "@/Components/DeviceCard";
import ItemsModal from "@/Components/Modals/ItemsModal";
import { useAuth } from "@/Context/AuthContext";
import { getItemsStock } from "@/Api/items-service";
import { useQuery } from "@tanstack/react-query";
import { getItemsRequest } from "@/Api/items-requests-service";

const statusFilters = [
  { label: "ทั้งหมด", value: "ALL" },
  { label: "มีในสต๊อค", value: "AVAILABLE" },
  { label: "ไม่พร้อมใช้งาน", value: "UNAVAILABLE" },
  { label: "ซ่อมบำรุง", value: "REPAIR" },
];

const statusRequest = [
  { label: "อนุมัติ", value: "APPROVED", color: "#34D399" },
  { label: "รออนุมัติ", value: "PENDING", color: "#6FA5F7" },
  { label: "ปฏิเสธ", value: "REJECTED", color: "#EF4444" },
];


const Device = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  const [isItemsModalOpen, setItemsModalOpen] = useState(false);
  const toggleItemsModal = () => setItemsModalOpen((v) => !v);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(9);
  const [filter, setFilter] = useState<"ALL" | "AVAILABLE" | "UNAVAILABLE" | "REPAIR">("ALL");
  //query
  //item stock
  const { data: itemsStock = [] } = useQuery({
    queryKey: ['items-stock', user?.role || 'guest'],
    queryFn: async () => {
      if (!user || isLoading) return [];
      const response = await getItemsStock();
      return response.data;
    },
    enabled: !!user && !isLoading,
  });
  //item request
  const { data: itemsRequest = { data: [], pagination: { totalItems: 0, totalPages: 1, page: 1, limit: 9 } } } = useQuery({
    queryKey: ['items-request', user?.role || 'guest', currentPage],
    queryFn: async () => {
      if (!user || isLoading) {
        return { data: [], pagination: { totalItems: 0, totalPages: 1, page: 1, limit: 9 } };
      }
      if (user.role === 'admin') {
        const response = await getItemsRequest(currentPage, itemPerPage,undefined,undefined);
        return response; // data + pagination
      } else {
        const response = await getItemsRequest(currentPage, itemPerPage,user.id,undefined);
        return response;
      }
    },
    enabled: !!user && !isLoading,
  });
  console.log("itemsRequest", itemsRequest);


  const filteredItems =
    filter === "ALL"
      ? itemsStock
      : itemsStock.filter((d) => d.status === filter);

  const [formData, setFormData] = useState({
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    departmentId: user?.departmentId,
    jobTitleId: user?.jobTitleId,
    nickName: user?.nickName,
    birthDate: new Date(user?.birthDate),
    googleId: user?.googleId,
    avatar: user?.avatarUrl,
  });

  const onChange = (key: keyof typeof formData, value: any) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
      <ItemsModal
        isOpen={isItemsModalOpen}
        onClose={() => setItemsModalOpen(false)}
        data={{ title: "ประวัติยืมอุปกรณ์" }}
        toggleModal={toggleItemsModal}
      />
      <Navbar onClick={() => navigate("/home")} />
      <BackgroundGradient />

      <div className="flex flex-col pt-10">
        <div className="flex flex-row justify-between border-b border-[#676767] w-full my-6">
          <p className="font-sukhumvit text-[28px] md:text-[36px] font-bold text-center">อุปกรณ์</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-5">
          {/* left panel */}
          <div className="flex flex-col w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
            <div className="flex flex-col px-5 pt-5">
              {/* ปุ่ม filter */}
              <div className="flex flex-row bg-[#00000052] rounded-[8px] w-full gap-1 p-1">
                {statusFilters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value as any)}
                    className={`font-sukhumvit-bold text-[20px] rounded-[4px] py-1 px-2 transition ${filter === f.value
                      ? "bg-[#FFD000] text-[#000000]"
                      : "text-[#FFD000] hover:bg-[#FFD00022]"
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* list card */}
              <div className="flex flex-row flex-wrap gap-5 my-3">
                {filteredItems.map((device) => (
                  <DeviceCard key={device.id} device={device} />
                ))}
              </div>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-col">
            {/* leaves history */}
            <div className="flex flex-col">
              <div className="flex flex-row w-full max-w-6xl rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
                <div className="flex flex-col w-full py-5 px-5">
                  <div className="flex flex-row justify-between">
                    <p className="font-sukhumvit text-[20px] font-bold ">ประวัติการยืมอุปกรณ์</p>
                    <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={toggleItemsModal}>
                      <CalendarIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
                      <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">ดูทั้งหมด</p>
                    </div>
                  </div>

                  {itemsRequest?.data?.map((item, index) => (
                    <div key={index} className="flex flex-row border-b border-[#676767] pt-5 pb-1 justify-between">
                      <img className="w-[92px] h-[52px] rounded-[4px]" src={item.image} alt="" />
                      <div className="flex flex-col w-[20vw] pl-2 pr-5">
                        <p className="font-sukhumvit text-[16px] text-white truncate">
                          {item.item.name}
                        </p>
                        <div className="flex flex-row justify-between">
                          <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{item.requestedBy.firstName + " " + item.requestedBy.lastName}</p>
                          <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{item.createdAt.split('T')[0] + " " + item.createdAt.split('T')[1].split(':')[0] + ":" + item.createdAt.split('T')[1].split(':')[1]}</p>
                        </div>
                      </div>
                      <StatusBadge
                        key={item.id}
                        status={statusRequest.find(s => s.value === item.status)?.label ?? item.status}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
          {/* end right */}
        </div>
      </div>
    </div>
  );
};

export default Device;