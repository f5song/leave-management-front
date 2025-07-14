import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/Contexts/AuthContext';
import { toast } from '@/Hooks/UseToast';
import { createUser } from '@/Api/users-service';
import { getJobTitles } from '@/Api/job-title-service';
import { getDepartments } from '@/Api/departments-service';

import Input from '@/Components/Input';
import Label from '@/Components/Label';
import SelectField from '@/Components/SelectField';
import PrimaryButton from '@/Components/PrimaryButton';
import { FunchIcon, FunchLogo } from '@/Shared/Asseet/Icons';

const schema = z.object({
  firstName: z.string().min(1, 'กรุณากรอกชื่อจริง'),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
  departmentId: z.string().min(1, 'กรุณาเลือกแผนก'),
  jobTitleId: z.string().min(1, 'กรุณาเลือกตำแหน่ง'),
  nickName: z.string().min(1, 'กรุณากรอกชื่อเล่น'),
  birthDate: z.string().min(1, 'กรุณาเลือกวันเกิด'),
  googleId: z.string().min(1, 'ไม่มี Google ID'),
  salary: z.coerce.number().gt(0, 'กรุณาระบุเงินเดือนมากกว่า 0'),
});

type RegisterFormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const googleData = location.state?.googleData;
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formData, setFormData] = useState<{ avatar?: string }>({});

  const { data: departments = [] } = useQuery({ queryKey: ['departments'], queryFn: getDepartments });
  const { data: jobTitles = [] } = useQuery({ queryKey: ['jobTitles'], queryFn: getJobTitles });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      departmentId: '',
      jobTitleId: '',
      nickName: '',
      birthDate: '',
      googleId: '',
      salary: 0,
    },
  });

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '',
    jobTitleId: '',
    nickName: '',
    birthDate: '',
    googleId: '',
    avatar: undefined,
  };

  useEffect(() => {
    if (googleData) {
      const nameParts = googleData.name?.split(' ') || [];
      setValue('firstName', nameParts[0] || '');
      setValue('lastName', nameParts.slice(1).join(' ') || '');
      setValue('email', googleData.email || '');
      setValue('googleId', googleData.googleId);
    }
  }, [googleData, setValue]);

  const registerMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (res) => {
      const { user, access_token } = res.data;
      login(user, access_token);
      navigate('/home');
      toast({
        title: 'สมัครสมาชิกสำเร็จ',
        description: 'ยินดีต้อนรับสู่ระบบลางาน Funch.tech',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'สมัครสมาชิกไม่สำเร็จ',
        description: error.message || 'กรุณาตรวจสอบข้อมูลและลองใหม่',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    if (!avatar) {
      toast({
        title: 'ข้อมูลไม่ครบ',
        description: 'กรุณาเลือกรูปพนักงานด้วย',
        variant: 'destructive',
      });
      return;
    }

    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      form.append(key, value.toString());
    });
    form.append('roleId', 'employee');
    form.append('avatar', avatar);

    registerMutation.mutate(form);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: previewUrl }));
    }
  };

  return (
    <div className="min-h-screen bg-quaternary text-white px-4 md:px-10 py-12 flex items-center justify-center relative">
      {/* background gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#FFA100] via-[#FF400084] to-[rgba(157,74,44,0)] pointer-events-none" />

      {/* main frame */}
      <div className="flex items-center justify-center w-full max-w-6xl rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
        <div className="flex flex-col w-full px-6 py-10 md:px-10 md:py-[40px]">

          {/* header */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <FunchIcon />
            <p className="font-sukhumvit text-[20px] md:text-[24px] font-bold text-center md:text-right">
              กรอกข้อมูลส่วนตัวเพิ่มเติม
            </p>
          </div>

          <div className="border-t border-white opacity-20 w-full my-6" />

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col lg:flex-row gap-8">

              {/* employee image */}
              <div className="flex flex-col">
                <div className="font-sukhumvit text-[16px] text-[var(--color-font)] mb-2">รูปภาพพนักงาน</div>
                <div className="flex flex-col items-center justify-center w-full lg:w-[325px] h-[372px] bg-[#00000052] gap-[10px] rounded-[4px]">
                  <img
                    src={formData.avatar || "/iconamoon_profile-fill.svg"}
                    alt="employee"
                    className="w-[130px] h-[130px] object-contain rounded-full"
                  />

                  <p className="font-sukhumvit text-[16px] text-[var(--color-font)]">
                    กดเพื่อเลือกรูปจากในอุปกรณ์ของคุณ
                  </p>

                  {/* ปุ่มเลือกไฟล์ */}
                  <label
                    htmlFor="employee-image"
                    className="cursor-pointer w-[143px] h-[49px] border border-[color:var(--color-font)] rounded-[4px] text-[color:var(--color-font)] font-sukhumvit font-bold text-[16px] leading-[100%] flex items-center justify-center"
                    style={{ letterSpacing: '0%' }}
                  >
                    เลือกรูปพนักงาน
                  </label>
                  <input
                    type="file"
                    id="employee-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>

              {/* form section */}
              <div className="flex flex-col gap-6 text-white font-sukhumvit w-full">

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <Label>อีเมล*</Label>
                  <Input type="email" disabled {...register('email')} />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                {/* ชื่อจริง + นามสกุล */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <Label>ชื่อจริง*</Label>
                    <Input {...register('firstName')} />
                    {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label>นามสกุล*</Label>
                    <Input {...register('lastName')} />
                    {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                  </div>
                </div>

                {/* ชื่อเล่น + วันเกิด */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <Label>ชื่อเล่น*</Label>
                    <Input {...register('nickName')} />
                    {errors.nickName && <p className="text-red-500">{errors.nickName.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label>วันเกิด*</Label>
                    <Input type="date" {...register('birthDate')} />
                    {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}
                  </div>
                </div>

                {/* แผนก */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <Controller
                      name="departmentId"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          label="แผนก"
                          name="departmentId"
                          options={(departments?.data || []).map((d: any) => ({
                            value: d.id,
                            label: d.name,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                          disabled={departments.length === 0}
                          required
                        />
                      )}
                    />
                    {errors.departmentId && <p className="text-red-500">{errors.departmentId.message}</p>}
                  </div>
                  {/* ตำแหน่ง */}
                  <div className="flex flex-col gap-2 w-full">
                    <Controller
                      name="jobTitleId"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          label="ตำแหน่ง"
                          name="jobTitleId"
                          options={(jobTitles?.data || []).map((j: any) => ({
                            value: j.id,
                            label: j.name,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                          disabled={jobTitles.length === 0}
                          required
                        />
                      )}
                    />
                    {errors.jobTitleId && <p className="text-red-500">{errors.jobTitleId.message}</p>}
                  </div>
                </div>

              </div>
            </div>

            <div className="flex flex-row justify-end gap-6 mt-9">
              <button
                type="button"
                className="h-[49px] p-[12px] rounded-[4px] text-[var(--color-primary)] font-sukhumvit text-[16px] font-bold"
                onClick={() => {
                  reset();
                  setAvatar(null);
                  setFormData(initialState);
                }}
              >
                ยกเลิก
              </button>
              <PrimaryButton type="submit">
                ยืนยันการสมัคร
              </PrimaryButton>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
