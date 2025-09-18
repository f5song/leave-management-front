"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/Context/AuthContext"
import { updateUser } from "@/Api/users-service"
import { profileSchema, type ProfileFormData } from "@/Shared/utils/profileValidation"

export const useProfileForm = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [avatar, setAvatar] = useState<File | null>(null)
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      departmentId: user?.departmentId || "",
      jobTitleId: user?.jobTitleId || "",
      nickName: user?.nickName || "",
      birthDate: user?.birthDate ? new Date(user.birthDate) : null,
    },
  })

  const userMutation = useMutation({
    mutationFn: (form: FormData) => updateUser(user?.id || "", form),
    onSuccess: () => {
      alert("บันทึกข้อมูลสำเร็จ")
      setAvatar(null)
      setPreviewAvatar(null)
      queryClient.invalidateQueries({ queryKey: ["user", user?.id] })
    },
    onError: (err: any) => alert(`เกิดข้อผิดพลาด: ${err.message}`),
  })

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        departmentId: user.departmentId || "",
        jobTitleId: user.jobTitleId || "",
        nickName: user.nickName || "",
        birthDate: user.birthDate ? new Date(user.birthDate) : null,
      })
    }
  }, [user, form])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setAvatar(file)
    setPreviewAvatar(URL.createObjectURL(file))
  }

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && key !== "avatar") {
          formData.append(key, value.toString())
        }
      })
      if (avatar) {
        formData.append("avatarUrl", avatar)
      }
      userMutation.mutate(formData)
    } catch (err: any) {
      alert(`เกิดข้อผิดพลาด: ${err.message}`)
    }
  }

  return {
    form,
    avatar,
    previewAvatar,
    handleAvatarChange,
    onSubmit,
    isSubmitting: userMutation.isPending,
    Controller,
  }
}
