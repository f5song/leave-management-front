import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/Context/AuthContext";
import { updateUser } from "@/Api/users-service";
import { ProfileData, profileSchema } from "@/Shared/utils/profileValidation";

export const useProfileForm = () => {
  const { user, refreshUser } = useAuth();
  const queryClient = useQueryClient();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const defaultValues: ProfileData = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    departmentId: user?.departmentId ?? "",
    jobTitleId: user?.jobTitleId ?? "",
    nickName: user?.nickName ?? "",
    birthDate: user?.birthDate ? new Date(user.birthDate) : null,
    avatarUrl: user?.avatarUrl ?? "",
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  /**
   * Reset form เมื่อ user เปลี่ยน (แต่ไม่ reset ตอน mount)
   */
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        departmentId: user.departmentId ?? "",
        jobTitleId: user.jobTitleId ?? "",
        nickName: user.nickName ?? "",
        birthDate: user.birthDate ? new Date(user.birthDate) : null,
        avatarUrl: user.avatarUrl ?? "",
      });
      setPreviewAvatar(null);
    }
  }, [user, reset]);

  /**
   * Mutation สำหรับอัปเดตข้อมูลผู้ใช้
   */
  const updateUserMutation = useMutation({
    mutationFn: (formData: FormData) => updateUser(user?.id ?? "", formData),
    onSuccess: async (res) => {
      alert("✅ บันทึกข้อมูลสำเร็จ");

      // เคลียร์สถานะรูปภาพ
      setAvatar(null);
      setPreviewAvatar(null);

      // อัปเดตข้อมูลใน cache (react-query)
      if (res?.data) {
        queryClient.setQueryData(["user", user?.id], res.data);
      }

      // อัปเดต context
      await refreshUser?.();

      // Invalidate ข้อมูลที่เกี่ยวข้อง
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      alert(`เกิดข้อผิดพลาด: ${error.message}`);
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };


  const onSubmit = handleSubmit(async (data) => {
    if (!user?.id) return;

    const formData = new FormData();

    const departmentIdValue = Array.isArray(data.departmentId)
      ? data.departmentId[0]
      : data.departmentId;

    const jobTitleIdValue = Array.isArray(data.jobTitleId)
      ? data.jobTitleId[0]
      : data.jobTitleId;

    Object.entries(data).forEach(([key, value]) => {
      if (value == null || value === "") return;

      switch (key) {
        case "birthDate":
          if (value instanceof Date) {
            formData.append(key, value.toISOString().split("T")[0]);
          }
          break;
        case "departmentId":
          formData.append(key, departmentIdValue ?? "");
          break;
        case "jobTitleId":
          formData.append(key, jobTitleIdValue ?? "");
          break;
        case "avatarUrl":
          break;
        default:
          formData.append(key, value.toString());
      }
    });

    // append avatar เฉพาะตอนเปลี่ยนจริง ๆ
    if (avatar instanceof File) {
      formData.append("avatarUrl", avatar);
    }

    await updateUserMutation.mutateAsync(formData);
  });

  /**
   * Debug form validation errors
   */
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.warn("⚠️ Form validation errors:", errors);
    }
  }, [errors]);

  return {
    form: {
      control,
      register,
      handleSubmit: onSubmit,
      errors,
    },
    Controller,
    isSubmitting: isSubmitting || updateUserMutation.isPending,
    handleAvatarChange,
    previewAvatar: previewAvatar ?? user?.avatarUrl,
    mutationStatus: updateUserMutation,
  };
};
