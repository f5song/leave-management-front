import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/Context/AuthContext';
import { toast } from '@/Shared/Hooks/UseToast';
import { createUser } from '@/Api/users-service';
import { getJobTitles } from '@/Api/job-title-service';
import { getDepartments } from '@/Api/departments-service';

import Input from '@/Components/Input';
import Label from '@/Components/Label';
import SelectField from '@/Components/SelectField';
import PrimaryButton from '@/Components/PrimaryButton';
import { DangerIcon, FunchIcon, ProfileIcon } from '@/Shared/Asseet/Icons';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const googleData = location.state?.googleData;
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formData, setFormData] = useState<{ avatar?: string }>({});

  const { data: departments = [] } = useQuery({ queryKey: ['departments'], queryFn: getDepartments });
  const { data: jobTitles = [] } = useQuery({ queryKey: ['jobTitles'], queryFn: getJobTitles });

  const schema = z.object({
    firstName: z
      .string()
      .trim()
      .min(1, 'กรุณากรอกชื่อจริง')
      .regex(/^[ก-๙a-zA-Z\s]+$/, 'ชื่อจริงต้องเป็นตัวอักษรเท่านั้น'),
    lastName: z
      .string()
      .trim()
      .min(1, 'กรุณากรอกนามสกุล')
      .regex(/^[ก-๙a-zA-Z\s]+$/, 'นามสกุลต้องเป็นตัวอักษรเท่านั้น'),
    email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
    departmentId: z.string().trim().min(1, 'เลือกแผนก'),
    jobTitleId: z.string().trim().min(1, 'เลือกตำแหน่ง'),
    nickName: z
      .string()
      .trim()
      .min(1, 'กรอกชื่อเล่น')
      .regex(/^[ก-๙a-zA-Z\s]+$/, 'ชื่อเล่นต้องเป็นตัวอักษรเท่านั้น'),
    birthDate: z.string().trim().min(1, 'เลือกวันเกิด'),
    googleId: z.string().trim().min(1, 'ไม่มี Google ID'),
    avatar: z.any().optional(),
  });


  type RegisterFormData = z.infer<typeof schema>;
  const {
    control,
    register,
    handleSubmit,
    watch,
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
      avatar: undefined,
    },
  });

  // set ค่าจาก google data
  useEffect(() => {
    if (googleData) {
      reset({
        email: googleData.email || '',
        googleId: googleData.googleId || '',
      });
    }
  }, [googleData, reset]);


  const registerMutation = useMutation({
    mutationFn: (form: FormData) => createUser(form),
    onSuccess: (res) => {
      const { user } = res;
      login(user);
      navigate('/calendar');
      alert('สมัครสมาชิกสำเร็จ');
    },
    onError: (error: any) => {
      alert(`เกิดข้อผิดพลาด: ${error.message}`);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    try {
      const form = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && key !== "avatar") {
          form.append(key, value.toString());
        }
      });
      form.append("avatarUrl", avatar);

      form.append("roleId", "employee");


      registerMutation.mutate(form);
    } catch (err: any) {
      alert(`เกิดข้อผิดพลาด: ${err.message}`);
    }
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
            <FunchIcon className="w-[276px] h-[52px]" />
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

                <div className="relative w-full lg:w-[325px] h-[372px] rounded-[4px] overflow-hidden group">

                  {!(formData.avatar) ? (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-[#00000052] gap-[10px] rounded-[4px]">
                      <ProfileIcon className="w-[130px] h-[130px] object-contain" />
                      <p className="font-sukhumvit text-[16px] text-[var(--color-font)]">
                        กดเพื่อเลือกรูปจากในอุปกรณ์ของคุณ
                      </p>
                      <label
                        htmlFor="employee-image"
                        className="cursor-pointer w-[143px] h-[49px] border border-[color:var(--color-font)] rounded-[4px] text-[color:var(--color-font)] font-sukhumvit font-bold text-[16px] leading-[100%] flex items-center justify-center"
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
                  ) : (
                    <>
                      {/* แสดงรูปที่อัปโหลด */}
                      <img
                        src={formData.avatar}
                        alt="employee"
                        className="w-full h-full object-cover"
                      />

                      {/* overlay แสดงเฉพาะตอนมีรูป */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                        <p className="text-white font-sukhumvit text-[16px]">กดเพื่อเลือกรูปจากในอุปกรณ์ของคุณ</p>
                        <label
                          htmlFor="employee-image"
                          className="cursor-pointer w-[94px] h-[49px] border border-white rounded-[4px] text-white font-sukhumvit font-bold text-[16px] leading-[100%] flex items-center justify-center"
                        >
                          เปลี่ยนรูป
                        </label>
                      </div>

                      <input
                        type="file"
                        id="employee-image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </>
                  )}
                </div>
              </div>


              {/* form section */}
              <div className="flex flex-col gap-6 text-white font-sukhumvit w-full">

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <Label>อีเมล*</Label>
                  <Input
                    type="email"
                    disabled
                    {...register('email')}
                    value={watch('email')} // ให้แสดงค่าที่ถูกเซ็ตไว้
                  />
                </div>

                {/* ชื่อจริง + นามสกุล */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <Label>ชื่อจริง*</Label>
                    <Input {...register('firstName')} placeholder='กรอกชื่อจริง' />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label>นามสกุล*</Label>
                    <Input {...register('lastName')} placeholder='กรอกนามสกุล' />
                  </div>
                </div>

                {/* ชื่อเล่น + วันเกิด */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <Label>ชื่อเล่น*</Label>
                    <Input {...register('nickName')} placeholder='กรอกชื่อเล่น' />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label>วันเกิด*</Label>
                    <Input type="date" {...register('birthDate')} placeholder='เลือกวันเกิด' />
                  </div>
                </div>

                {/* แผนก */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <Label>แผนก*</Label>
                    <Controller
                      name="departmentId"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          label="แผนก"
                          name="departmentId"
                          options={(departments || []).map((d: any) => ({
                            value: d.id,
                            label: d.name,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                          disabled={departments.length === 0}
                          placeholder='เลือกแผนก'
                          required
                        />
                      )}
                    />
                  </div>
                  {/* ตำแหน่ง */}
                  <div className="flex flex-col gap-2 w-full">
                    <Label>ตำแหน่ง*</Label>
                    <Controller
                      name="jobTitleId"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          label="ตำแหน่ง"
                          name="jobTitleId"
                          options={(jobTitles || []).map((j: any) => ({
                            value: j.id,
                            label: j.name,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                          disabled={jobTitles.length === 0}
                          placeholder='เลือกตำแหน่ง'
                          required
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between mt-9">
              {errors.firstName || errors.lastName || errors.nickName || errors.birthDate || errors.departmentId || errors.jobTitleId ? (
                <div className="flex items-stretch bg-[#00000052] border border-[#ED363F] rounded-[4px] overflow-hidden h-[48px]">

                  <div className="flex items-center justify-center px-3 bg-transparent">
                    <DangerIcon className="w-[24px] h-[24px] fill-[#ED363F]" />
                  </div>

                  {/* เส้นคั่นแนวตั้ง */}
                  <div className="w-px bg-[#ED363F]" />

                  <div className="flex items-center px-2">
                    <p className="text-red-500 font-sukhumvit-bold">
                      {[
                        errors.firstName?.message,
                        errors.lastName?.message,
                        errors.nickName?.message,
                        errors.birthDate?.message,
                        errors.departmentId?.message,
                        errors.jobTitleId?.message,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  </div>

                </div>
              ) : (
                <p></p>
              )}

              <div className='flex flex-row justify-end gap-6'>
                <button
                  type="button"
                  className="h-[49px] p-[12px] rounded-[4px] text-[var(--color-primary)] font-sukhumvit text-[16px] font-bold"
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  ยกเลิก
                </button>
                <PrimaryButton type="submit">
                  ยืนยันการสมัคร
                </PrimaryButton>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
