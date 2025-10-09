import { EditIcon } from "@/Shared/Asseet/Icons";

interface ProfileHeaderProps {
  isEditing: boolean;
  toggleEditing: () => void;
  title?: string;
}

const ProfileHeader = ({ isEditing, toggleEditing, title = "ข้อมูลพนักงาน" }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-row justify-between">
      <p className="font-sukhumvit text-[20px] font-bold">{title}</p>
      <div
        className="flex flex-row items-center cursor-pointer group hover:text-white"
        onClick={toggleEditing}
      >
        <EditIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
        <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">
          {isEditing ? "ยกเลิก" : "แก้ไขข้อมูล"}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
