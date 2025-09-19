"use client"

import type React from "react"

import { useAuth } from "@/Context/AuthContext"

interface AvatarUploadProps {
  previewAvatar: string | null
  isEditing: boolean
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AvatarUpload = ({ previewAvatar, isEditing, onAvatarChange }: AvatarUploadProps) => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col">
      <p className="font-sukhumvit text-[16px]">รูปพนักงาน</p>
      <div className="relative w-[160px] h-[160px]">
        <img
          className="w-[160px] h-[160px] rounded-[4px] border border-[#000000]"
          src={previewAvatar || user?.avatarUrl || "/default-avatar.png"}
          alt="avatar"
        />

        {isEditing && (
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 rounded-[4px]">
            <label
              htmlFor="employee-image"
              className="cursor-pointer w-[94px] h-[40px] border border-white rounded-[4px] text-white font-sukhumvit font-bold text-[14px] leading-[100%] flex items-center justify-center"
            >
              เปลี่ยนรูป
            </label>
          </div>
        )}
      </div>

      <input type="file" accept="image/*" id="employee-image" className="hidden" onChange={onAvatarChange} />
    </div>
  )
}