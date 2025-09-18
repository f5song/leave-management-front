import ItemsModal from "@/Components/Modals/ItemsModal"
import LeaveModal from "@/Components/Modals/LeaveModal"
import { useAuth } from "@/Context/AuthContext"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSchema } from "@/Shared/utils/profileValidation"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { useProfileData } from "@/Hook/useProfileData"
import { updateUser } from "@/Api/users-service"

const Profile = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const queryClient = useQueryClient()
  
    const [isEditing, setIsEditing] = useState(false)
    const [isLeaveModalOpen, setLeaveModalOpen] = useState(false)
    const [isItemsModalOpen, setItemsModalOpen] = useState(false)
    const [previewAvatar, setPreviewAvatar] = useState(null)
    const [avatar, setAvatar] = useState(null)
  
    const { departments, jobTitles, leaveData, itemsRequest, leaveBalance } = useProfileData(user?.id)
  
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        departmentId: user?.departmentId || '',
        jobTitleId: user?.jobTitleId || '',
        nickName: user?.nickName || '',
        birthDate: user?.birthDate ? new Date(user.birthDate) : null,
      },
    })
  
    const userMutation = useMutation({
      mutationFn: (form) => updateUser(user?.id || '', form),
      onSuccess: () => {
        alert('บันทึกข้อมูลสำเร็จ')
        setAvatar(null)
        queryClient.invalidateQueries({ queryKey: ['user', user?.id] })
      },
      onError: (err) => alert(`เกิดข้อผิดพลาด: ${err.message}`),
    })
  
    useEffect(() => {
      if (user) {
        reset({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          departmentId: user.departmentId || '',
          jobTitleId: user.jobTitleId || '',
          nickName: user.nickName || '',
          birthDate: user.birthDate ? new Date(user.birthDate) : null,
        })
      }
    }, [user, reset])
  
    const toggleEditing = () => setIsEditing(prev => !prev)
    const toggleLeaveModal = () => setLeaveModalOpen(!isLeaveModalOpen)
    const toggleItemsModal = () => setItemsModalOpen(!isItemsModalOpen)
  
    const handleAvatarChange = (e) => {
      const file = e.target.files?.[0]
      if (!file) return
  
      setAvatar(file)
      setPreviewAvatar(URL.createObjectURL(file))
    }
  
    const onSubmit = async (data) => {
      try {
        const form = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && key !== "avatar") {
            form.append(key, value.toString())
          }
        })
        form.append("avatarUrl", avatar)
        userMutation.mutate(form)
      } catch (err) {
        alert(`เกิดข้อผิดพลาด: ${err.message}`)
      }
    }
  
    return (
      <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
        <LeaveModal 
          isOpen={isLeaveModalOpen} 
          onClose={() => setLeaveModalOpen(false)} 
          title="ประวัติการลา" 
          toggleModal={toggleLeaveModal} 
        />
        <ItemsModal 
          isOpen={isItemsModalOpen} 
          onClose={() => setItemsModalOpen(false)} 
          data={{ title: "ประวัติยืมอุปกรณ์" }} 
          toggleModal={toggleItemsModal} 
        />
    </div>
    )
}