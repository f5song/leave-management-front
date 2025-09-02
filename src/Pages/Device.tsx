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

const mockUser = {
  firstName: "สมชาย",
  lastName: "ใจดี",
  email: "somchai@example.com",
  departmentId: "dep1",
  jobTitleId: "title1",
  nickName: "ชาย",
  birthDate: "1995-08-10",
  googleId: "somchai.google",
  avatarUrl: "https://via.placeholder.com/160",
};

const itemsHistoryData = [
  { id: 1, title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์ฟน่ดห่กดร่ยรด่", employee: "งูพิษชยา แซวมอล", dateTime: "28-07-2026 12:30", status: "อนุมัติ", image: "https://via.placeholder.com/160" },
  { id: 2, title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์ฟวหกาฟนหากยนฟห", employee: "พัชรดนุย หัวคุย", dateTime: "01-08-2026 12:30", status: "รออนุมัติ", image: "https://via.placeholder.com/160" },
  { id: 3, title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์", employee: "จักมันส์ รักแฟนค้าบ", dateTime: "10-08-2026 12:30", status: "ปฏิเสธ", image: "https://via.placeholder.com/160" },
  { id: 4, title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์", employee: "จักมันส์ รักแฟนค้าบ", dateTime: "10-08-2026 12:30", status: "ปฏิเสธ", image: "https://via.placeholder.com/160" },
  { id: 5, title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์", employee: "จักมันส์ รักแฟนค้าบ", dateTime: "10-08-2026 12:30", status: "ปฏิเสธ", image: "https://via.placeholder.com/160" },
  { id: 6, title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์ฟน่ดห่กดร่ยรด่", employee: "งูพิษชยา แซวมอล", dateTime: "28-07-2026 12:30", status: "อนุมัติ", image: "https://via.placeholder.com/160" },
  { id: 7, title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์ฟน่ดห่กดร่ยรด่", employee: "งูพิษชยา แซวมอล", dateTime: "28-07-2026 12:30", status: "อนุมัติ", image: "https://via.placeholder.com/160" },
];

const itemsStockData = [
  { id: "MB03052025", title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์ฟน่ดห่กดร่ยรด่", date: "28-07-2026", status: "มีในสต๊อค", image: "https://via.placeholder.com/160" },
  { id: "MB03052025", title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์ฟวหกาฟนหากยนฟห", date: "01-08-2026", status: "มีในสต๊อค", image: "https://via.placeholder.com/160" },
  { id: "MB03052025", title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์", date: "10-08-2026", status: "มีในสต๊อค", image: "https://via.placeholder.com/160" },
  { id: "MB03052025", title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์", date: "10-08-2026", status: "มีในสต๊อค", image: "https://via.placeholder.com/160" },
  { id: "MB03052025", title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์", date: "10-08-2026", status: "มีในสต๊อค", image: "https://via.placeholder.com/160" },
  { id: "MB03052025", title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์ฟน่ดห่กดร่ยรด่", date: "28-07-2026", status: "มีในสต๊อค", image: "https://via.placeholder.com/160" },
  { id: "MB03052025", title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์ฟน่ดห่กดร่ยรด่", date: "28-07-2026", status: "จักมันส์ รักแฟนค้าบ", image: "https://via.placeholder.com/160" },
  { id: "MB03052025", title: "MACBOOK Air ชิป M2 สีแดงแรง ฤทธิ์ฟน่ดห่กดร่ยรด่", date: "28-07-2026", status: "จักมันส์ รักแฟนค้าบ", image: "https://via.placeholder.com/160" },
];


const Device = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
  const [isFacilitiesModalOpen, setFacilitiesModalOpen] = useState(false);
  const toggleLeaveModal = () => setLeaveModalOpen((v) => !v);
  const toggleFacilitiesModal = () => setFacilitiesModalOpen((v) => !v);
  const [filter, setFilter] = useState<"ทั้งหมด" | "มีในสต๊อค" | "ยืมอุปกรณ์">(
    "ทั้งหมด"
  );

  const filteredItems =
    filter === "ทั้งหมด"
      ? itemsStockData
      : itemsStockData.filter((d) => d.status === filter);

  const [formData, setFormData] = useState({
    email: mockUser.email,
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    departmentId: mockUser.departmentId,
    jobTitleId: mockUser.jobTitleId,
    nickName: mockUser.nickName,
    birthDate: new Date(mockUser.birthDate),
    googleId: mockUser.googleId,
    avatar: mockUser.avatarUrl,
  });

  const onChange = (key: keyof typeof formData, value: any) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
      <ItemsModal
        isOpen={isLeaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        data={{ title: "ประวัติยืมอุปกรณ์" }}
        toggleModal={toggleLeaveModal}
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
                {["ทั้งหมด", "มีในสต๊อค", "ยืมอุปกรณ์"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`font-sukhumvit-bold text-[20px] rounded-[4px] py-1 px-2 transition ${filter === f
                      ? "bg-[#FFD000] text-[#000000]"
                      : "text-[#FFD000] hover:bg-[#FFD00022]"
                      }`}
                  >
                    {f}
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
                    <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={toggleLeaveModal}>
                      <CalendarIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
                      <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">ดูทั้งหมด</p>
                    </div>
                  </div>

                  {itemsHistoryData.map((item, index) => (
                    <div key={index} className="flex flex-row border-b border-[#676767] pt-5 pb-1 justify-between">
                      <img className="w-[92px] h-[52px] rounded-[4px]" src={item.image} alt="" />
                      <div className="flex flex-col w-[20vw] pl-2 pr-5">
                        <p className="font-sukhumvit text-[16px] text-white truncate">
                          {item.title}
                        </p>
                        <div className="flex flex-row justify-between">
                          <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{item.employee}</p>
                          <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{item.dateTime}</p>
                        </div>
                      </div>
                      <StatusBadge status={item.status} />

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