import BackgroundGradient from "@/Components/BackgroundGradient";
import Navbar from "@/Components/Navbar";
import LeaveModal from "@/Components/Modals/LeaveModal";
import ItemsModal from "@/Components/Modals/ItemsModal";
import ProfileHeader from "@/Components/Profile/ProfileHeader";
import { ProfileForm } from "@/Components/Profile/ProfileForm";
import LeaveBalance from "@/Components/LeaveBalance";
import { useState } from "react";
import LeaveHistory from "@/Components/Profile/LeaveHistory";
import ItemsHistory from "@/Components/Profile/ItemsHistory";
import Header from "@/Components/Header";
import ContentCard from "@/Components/ContentCard";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing(prev => !prev);

  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
  const [isItemsModalOpen, setItemsModalOpen] = useState(false);
  const toggleLeaveModal = () => setLeaveModalOpen(!isLeaveModalOpen);
  const toggleItemsModal = () => setItemsModalOpen(!isItemsModalOpen);

  return (
    <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
      <LeaveModal isOpen={isLeaveModalOpen} onClose={() => setLeaveModalOpen(false)} title="ประวัติการลา" toggleModal={toggleLeaveModal} />
      <ItemsModal isOpen={isItemsModalOpen} onClose={() => setItemsModalOpen(false)} data={{ title: "ประวัติยืมอุปกรณ์" }} />
      <Navbar/>
      <BackgroundGradient />

      <div className="flex flex-col pt-5">
        {/* Header */}
        <Header title="โปรไฟล์" />

        <div className="flex flex-col xl:flex-row gap-5">
          {/* Left panel */}
          <ContentCard>
              <ProfileHeader isEditing={isEditing} toggleEditing={toggleEditing} />
              <ProfileForm isEditing={isEditing} />
          </ContentCard>

          {/* Right panel: leave & items */}
          <div className="flex flex-col gap-5">
            <LeaveBalance />
            <LeaveHistory toggleLeaveModal={toggleLeaveModal} />
            <ItemsHistory toggleItemsModal={toggleItemsModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;