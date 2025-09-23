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

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      departmentId: user?.departmentId || "",
      jobTitleId: user?.jobTitleId || "",
      nickName: user?.nickName || "",
      birthDate: user?.birthDate ? new Date(user.birthDate) : null,
      avatarUrl: user?.avatarUrl || "",
    },
  });

  // reset ค่า form เมื่อ user เปลี่ยน
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        departmentId: user.departmentId || "",
        jobTitleId: user.jobTitleId || "",
        nickName: user.nickName || "",
        birthDate: user.birthDate ? new Date(user.birthDate) : null,
        avatarUrl: user.avatarUrl || "",
      });
      // รีเซ็ต preview avatar เมื่อ user data เปลี่ยน
      setPreviewAvatar(null);
    }
  }, [user, reset]);

  // Mutations
  const userMutation = useMutation({
    mutationFn: (form: FormData) => updateUser(user?.id || "", form),
    onSuccess: async (updatedUserData) => {
      console.log("✅ อัพเดทสำเร็จ:", updatedUserData);
      alert("บันทึกข้อมูลสำเร็จ");

      // ล้าง state ของ avatar และ preview
      setAvatar(null);
      setPreviewAvatar(null);

      try {
        // วิธี 1: อัพเดท cache โดยตรง
        if (updatedUserData?.data) {
          queryClient.setQueryData(["user", user?.id], updatedUserData.data);
        }

        // วิธี 2: รีเฟรช AuthContext
        if (refreshUser) {
          await refreshUser();
        }

        // วิธี 3: Invalidate queries เพื่อให้ fetch ใหม่
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["profile"] });

        console.log("🔄 รีเฟรชข้อมูลสำเร็จ");

      } catch (error) {
        console.error("❌ รีเฟรชข้อมูลผิดพลาด:", error);
      }
    },
    onError: (err: any) => {
      console.error("❌ เกิดข้อผิดพลาด:", err);
      alert(`เกิดข้อผิดพลาด: ${err.message}`);
    },
  });

  // handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("📸 เลือกไฟล์ avatar:", file.name);
    setAvatar(file);

    // สร้าง preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewAvatar(previewUrl);
  };

  // submit form
  const onSubmit = async (data: ProfileData) => {
    if (!user?.id) return;

    const form = new FormData();

    // แปลง departmentId / jobTitleId เป็น string หากเป็น array
    const departmentIdValue = Array.isArray(data.departmentId) ? data.departmentId[0] : data.departmentId;
    const jobTitleIdValue = Array.isArray(data.jobTitleId) ? data.jobTitleId[0] : data.jobTitleId;

    // Append fields
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "birthDate" && value instanceof Date) {
        form.append(key, value.toISOString().split("T")[0]);
      } else if (key === "departmentId") {
        form.append(key, departmentIdValue || "");
      } else if (key === "jobTitleId") {
        form.append(key, jobTitleIdValue || "");
      } else if (key !== "avatarUrl" && value !== "") {
        form.append(key, value.toString());
      }
    });

    // Append avatar file หรือ URL ใหม่เท่านั้น
    if (avatar instanceof File) {
      form.append("avatarUrl", avatar); // ส่งไฟล์ใหม่
      console.log("📷 เพิ่มไฟล์ avatar:", avatar.name);
    } else if (previewAvatar && previewAvatar !== user?.avatarUrl) {
      form.append("avatarUrl", previewAvatar); // ส่ง URL ใหม่
      console.log("🌐 ส่ง URL avatar:", previewAvatar);
    }
    // ถ้า previewAvatar === user.avatarUrl → ไม่ append เลย

    // Debug: แสดง FormData
    for (let [key, value] of form.entries()) {
      console.log(key, value);
    }

    await userMutation.mutateAsync(form);
  };


  // เพิ่ม logging สำหรับ errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("⚠️ Form validation errors:", errors);
    }
  }, [errors]);

  // return สิ่งที่ component จะใช้
  return {
    form: {
      control,
      register,
      handleSubmit,
      errors,
    },
    Controller,
    onSubmit,
    isSubmitting: isSubmitting || userMutation.isPending,
    handleAvatarChange,
    previewAvatar: previewAvatar || user?.avatarUrl, // ใช้ preview หรือ avatarUrl จาก user
    mutationStatus: {
      isPending: userMutation.isPending,
      isError: userMutation.isError,
      isSuccess: userMutation.isSuccess,
      error: userMutation.error,
    }
  };
};