import { EditIcon } from "@/Shared/Asseet/Icons"

export const ProfileHeader = ({ isEditing, onToggleEdit }: { isEditing: boolean, onToggleEdit: () => void }) => (
    <div className="flex flex-row justify-between">
      <p className="font-sukhumvit text-[20px] font-bold text-white">ข้อมูลพนักงาน</p>
      <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={onToggleEdit}>
        <EditIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
        <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">
          {isEditing ? 'ยกเลิก' : 'แก้ไขข้อมูล'}
        </p>
      </div>
    </div>
  )