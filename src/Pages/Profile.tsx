import BackgroundGradient from "@/Components/BackgroundGradient";
import Navbar from "@/Components/Navbar";
import LeaveModal from "@/Components/Modals/LeaveModal";
import ItemsModal from "@/Components/Modals/ItemsModal";

import { useNavigate } from "react-router-dom";


import ProfileHeader from "@/Components/Profile/ProfileHeader";
import { ProfileForm } from "@/Components/Profile/ProfileForm";
import LeaveBalance from "@/Components/Profile/LeaveBalance";
import { useState } from "react";
import LeaveHistory from "@/Components/Profile/LeaveHistory";
import ItemsHistory from "@/Components/Profile/ItemsHistory";


const Profile = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing(prev => !prev);

  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
  const [isItemsModalOpen, setItemsModalOpen] = useState(false);
  const toggleLeaveModal = () => setLeaveModalOpen(!isLeaveModalOpen);
  const toggleItemsModal = () => setItemsModalOpen(!isItemsModalOpen);

  



  return (
    <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
      <LeaveModal isOpen={isLeaveModalOpen} onClose={() => setLeaveModalOpen(false)} title="ประวัติการลา" toggleModal={toggleLeaveModal} />
      <ItemsModal isOpen={isItemsModalOpen} onClose={() => setItemsModalOpen(false)} data={{ title: "ประวัติยืมอุปกรณ์" }} toggleModal={toggleItemsModal} />
      <Navbar onClick={() => navigate('/home')} />
      <BackgroundGradient />

      <div className="flex flex-col pt-10">
        {/* Header */}
        <div className="flex flex-row justify-between border-b border-[#676767] w-full my-6">
          <p className="font-sukhumvit text-[28px] md:text-[36px] font-bold text-center">โปรไฟล์</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-5">
          {/* Left panel */}
          <div className="flex flex-col w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
            <div className="flex flex-col w-full px-5 pt-5">
              <ProfileHeader isEditing={isEditing} toggleEditing={toggleEditing} />
              <ProfileForm isEditing={isEditing} />
            </div>
          </div>

          {/* Right panel: leave & items */}
          <div className="flex flex-col gap-5">
            {/* Leave balance */}
            <LeaveBalance/>

            {/* Leave history */}
            <LeaveHistory toggleLeaveModal={toggleLeaveModal} />
            {/* Items history */}
            <ItemsHistory toggleItemsModal={toggleItemsModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;