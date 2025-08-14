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

const mockDepartments = [
  { value: "dep1", label: "ฝ่ายการตลาด" },
  { value: "dep2", label: "ฝ่ายพัฒนา" },
  { value: "dep3", label: "ฝ่ายทรัพยากรบุคคล" },
];

const mockJobTitles = [
  { value: "title1", label: "นักพัฒนา Frontend" },
  { value: "title2", label: "นักพัฒนา Backend" },
  { value: "title3", label: "นักออกแบบ UX/UI" },
];

const mockLeaveData = [
  { type: "ลากิจ 2 วัน", reason: "ลาไปทำธุระ", startDate: "26-07-2026", endDate: "28-07-2026" },
  { type: "ลาป่วย 1 วัน", reason: "เป็นไข้", startDate: "01-08-2026", endDate: "01-08-2026" },
  { type: "ลาพักร้อน 3 วัน", reason: "ไปเที่ยวทะเล", startDate: "10-08-2026", endDate: "12-08-2026" },
];

const facilitiesData = [
  { name: "MACKBOOK", quantity: "จำนวน 1", timeStamp: "26-07-2026 12:30" },
  { name: "Adobe Creative Cloud", quantity: "จำนวน 1", timeStamp: "26-07-2026 12:30" },
  { name: "Midjourney Image Generator AI", quantity: "จำนวน 1", timeStamp: "26-07-2026 12:30" },
  { name: "CHAT GPT", quantity: "จำนวน 1", timeStamp: "26-07-2026 12:30" },
];

const Device = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
  const [isFacilitiesModalOpen, setFacilitiesModalOpen] = useState(false);
  const toggleLeaveModal = () => setLeaveModalOpen((v) => !v);
  const toggleFacilitiesModal = () => setFacilitiesModalOpen((v) => !v);

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
      <LeaveModal
        isOpen={isLeaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        data={{ title: "ประวัติการลา" }}
        toggleModal={toggleLeaveModal}
      />
      <FacilitiesModal
        isOpen={isFacilitiesModalOpen}
        onClose={() => setFacilitiesModalOpen(false)}
        data={{ title: "ประวัติยืมอุปกรณ์" }}
        toggleModal={toggleFacilitiesModal}
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
              <div className="flex flex-row bg-[#00000052] rounded-[8px] w-full gap-1">
                <p className="font-sukhumvit-bold text-[20px] bg-[#FFD000] rounded-[4px] text-[#000000] py-1 px-2">ทั้งหมด</p>
                <p className="font-sukhumvit-bold text-[20px] rounded-[4px] text-[#FFD000] py-1 px-2">มีในสต๊อค</p>
                <p className="font-sukhumvit-bold text-[20px] rounded-[4px] text-[#FFD000] py-1 px-2">ยืมอุปกรณ์</p>
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

                  {mockLeaveData.map((leave, index) => (
                    <div key={index} className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between">
                      <div className="w-[110px]">
                        <p className="font-sukhumvit text-[16px] text-white">{leave.type}</p>
                      </div>
                      <div className="w-[178px]">
                        <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.reason}</p>
                      </div>
                      <div className="flex flex-row items-center w-[168px]">
                        <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.startDate}</p>
                        <ArrowIcon className="fill-white" />
                        <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.endDate}</p>
                      </div>
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