"use client"

import Label from "@/Components/Label"
import Input from "@/Components/Input"
import PrimaryButton from "@/Components/PrimaryButton"
import SelectField from "@/Components/SelectField"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { AvatarUpload } from "./AvatarUpload"
import { useProfileForm } from "@/Hook/useProfileForm"

interface ProfileFormProps {
  isEditing: boolean
  departments: any[]
  jobTitles: any[]
}

export const ProfileForm = ({ isEditing, departments, jobTitles }: ProfileFormProps) => {
  const { form, avatar, previewAvatar, handleAvatarChange, onSubmit, isSubmitting, Controller } = useProfileForm()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form

  return (
    <div className="flex flex-col lg:flex-row pt-4 gap-5">
      <AvatarUpload previewAvatar={previewAvatar} isEditing={isEditing} onAvatarChange={handleAvatarChange} />

      <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full gap-3">
          <div className="w-full">
            <Label htmlFor="email">อีเมล</Label>
            <Input id="email" {...register("email")} className="w-full" disabled={!isEditing} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-full">
              <Label htmlFor="firstName">ชื่อจริง</Label>
              <Input id="firstName" {...register("firstName")} className="w-full" disabled={!isEditing} />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="lastName">นามสกุล</Label>
              <Input id="lastName" {...register("lastName")} className="w-full" disabled={!isEditing} />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-full">
              <Label htmlFor="nickName">ชื่อเล่น</Label>
              <Input id="nickName" {...register("nickName")} className="w-full" disabled={!isEditing} />
              {errors.nickName && <p className="text-red-500 text-sm mt-1">{errors.nickName.message}</p>}
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="birthDate">วันเกิด</Label>
              <Controller
                control={control}
                name="birthDate"
                render={({ field }) => (
                  <DatePicker
                    id="birthDate"
                    selected={field.value}
                    onChange={(date: Date | null) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    className="w-full h-[49px] p-[12px] rounded-[4px] backdrop-blur-[8px] transition duration-200 bg-[#00000052] text-[var(--color-font)] placeholder-[var(--color-font)] border border-transparent hover:border-[#FFD000] hover:text-[#FFD000] hover:placeholder-[#FFD000] active:border-[#FFFFFF] active:text-[#FFFFFF] active:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#1A1A1A]"
                    disabled={!isEditing}
                    locale="th"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-full">
              <Label htmlFor="departmentId">แผนก</Label>
              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="departmentId"
                    label="แผนก"
                    name="departmentId"
                    options={(departments || []).map((d) => ({ value: d.id, label: d.name }))}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={!isEditing}
                    placeholder="เลือกแผนก"
                    required
                  />
                )}
              />
              {errors.departmentId && <p className="text-red-500 text-sm mt-1">{errors.departmentId.message}</p>}
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="jobTitleId">ตำแหน่ง</Label>
              <Controller
                name="jobTitleId"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="jobTitleId"
                    label="ตำแหน่ง"
                    name="jobTitleId"
                    options={(jobTitles || []).map((d) => ({ value: d.id, label: d.name }))}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={!isEditing}
                    placeholder="เลือกตำแหน่ง"
                    required
                  />
                )}
              />
              {errors.jobTitleId && <p className="text-red-500 text-sm mt-1">{errors.jobTitleId.message}</p>}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end px-5 pb-5 mt-4">
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </PrimaryButton>
          </div>
        )}
      </form>
    </div>
  )
}
