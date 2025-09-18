import BackgroundGradient from "@/Components/BackgroundGradient";
import Navbar from "@/Components/Navbar";
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import PrimaryButton from "@/Components/PrimaryButton";
import SelectField from "@/Components/SelectField";
import LeaveModal from "@/Components/Modals/LeaveModal";
import ItemsModal from "@/Components/Modals/ItemsModal";

import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/Context/AuthContext";

import {
    getDepartments
} from "@/Api/departments-service";
import { getJobTitles } from "@/Api/job-title-service";
import { getLeavesByUser } from "@/Api/leave-service";
import { getItemsRequest } from "@/Api/items-requests-service";
import { getUserLeavesBalance, updateAvatar, updateUser } from "@/Api/users-service";

import { ArrowIcon, CalendarIcon, ComputerIcon, EditIcon } from "@/Shared/Asseet/Icons";

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const toggleEditing = () => setIsEditing(prev => !prev);

    const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
    const [isItemsModalOpen, setItemsModalOpen] = useState(false);
    const toggleLeaveModal = () => setLeaveModalOpen(!isLeaveModalOpen);
    const toggleItemsModal = () => setItemsModalOpen(!isItemsModalOpen);

    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);

    // 🔹 Queries
    const { data: departments = [] } = useQuery({ queryKey: ['departments'], queryFn: getDepartments });
    const { data: jobTitles = [] } = useQuery({ queryKey: ['jobTitles'], queryFn: getJobTitles });
    const { data: leaveData = [] } = useQuery({ queryKey: ['leaveData'], queryFn: () => getLeavesByUser(user?.id || '') });
    const { data: itemsRequest = [] } = useQuery({ queryKey: ['itemsRequest'], queryFn: () => getItemsRequest(undefined, undefined, user?.id || '') });
    const { data: leaveBalance = [] } = useQuery({ queryKey: ['leaveBalance'], queryFn: () => getUserLeavesBalance(user?.id || '') });

    // 🔹 Validation schema
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
        birthDate: z.date().optional(),
        googleId: z.string().trim().min(1, 'ไม่มี Google ID'),
        avatar: z.any().optional(),
    });

    type ProfileData = z.infer<typeof schema>;

    const { 
        control, 
        register, 
        handleSubmit, 
        reset,
        formState: { errors },
    } = useForm<ProfileData>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            departmentId: user?.departmentId || '',
            jobTitleId: user?.jobTitleId || '',
            nickName: user?.nickName || '',
            birthDate: user?.birthDate ? new Date(user.birthDate) : null,
            avatar: user?.avatarUrl || '',
        },
    });

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
                avatar: user.avatarUrl || '',
            });
        }
    }, [user, reset]);

    // 🔹 Mutations

    const userMutation = useMutation({
        mutationFn: (form: FormData) => updateUser(user?.id || '', form),
        onSuccess: () => {
            alert('บันทึกข้อมูลสำเร็จ');
            setAvatar(null);
            queryClient.invalidateQueries({ queryKey: ['user', user?.id] });
        },
        onError: (err: any) => alert(`เกิดข้อผิดพลาด: ${err.message}`),
    });


    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setAvatar(file);
        setPreviewAvatar(URL.createObjectURL(file));
    };

    const onSubmit = async (data: ProfileData) => {
        try {
            const form = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && key !== "avatar") {
                    form.append(key, value.toString());
                }
            });
            form.append("avatarUrl", avatar);
            userMutation.mutate(form);

            alert('บันทึกข้อมูลสำเร็จ');
            setAvatar(null);
        } catch (err: any) {
            alert(`เกิดข้อผิดพลาด: ${err.message}`);
        }
    };

    console.log("leaveData", leaveData);


    return (
        <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
            <LeaveModal isOpen={isLeaveModalOpen} onClose={() => setLeaveModalOpen(false)} title="ประวัติการลา" toggleModal={toggleLeaveModal} />
            <ItemsModal isOpen={isItemsModalOpen} onClose={() => setItemsModalOpen(false)} data={{ title: "ประวัติยืมอุปกรณ์" }} toggleModal={toggleItemsModal} />
            <Navbar onClick={() => navigate('/home')} />
            <BackgroundGradient />

            <div className="flex flex-col pt-10">
                {/* Header */}
                <div className="flex flex-row justify-between border-b border-[#676767] w-full my-6">
                    <p className="font-sukhumvit text-[28px] md:text-[36px] font-bold text-center">โปรไฟล์</p>
                </div>

                <div className="flex flex-col xl:flex-row gap-5">
                    {/* Left panel */}
                    <div className="flex flex-col w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
                        <div className="flex flex-col w-full px-5 pt-5">
                            <div className="flex flex-row justify-between">
                                <p className="font-sukhumvit text-[20px] font-bold ">ข้อมูลพนักงาน</p>
                                <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={toggleEditing}>
                                    <EditIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
                                    <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">
                                        {isEditing ? 'ยกเลิก' : 'แก้ไขข้อมูล'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row pt-4 gap-5">
                                {/* Avatar */}
                                <div className="flex flex-col">
                                    <p className="font-sukhumvit text-[16px]">รูปพนักงาน</p>
                                    {/* container ที่มี relative + group */}
                                    <div className="relative w-[160px] h-[160px]">
                                        <img
                                            className="w-[160px] h-[160px] rounded-[4px] border border-[#000000]"
                                            src={previewAvatar || user?.avatarUrl || "/default-avatar.png"}
                                            alt="avatar"
                                        />

                                        {/* overlay */}
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

                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="employee-image"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />

                                </div>

                                {/* Form */}
                                <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex flex-col w-full gap-3">
                                        <div className="w-full">
                                            <Label htmlFor="email">อีเมล</Label>
                                            <Input id="email" {...register('email')} className="w-full" disabled={!isEditing} />
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-3">
                                            <div className="flex flex-col w-full">
                                                <Label htmlFor="firstName">ชื่อจริง</Label>
                                                <Input id="firstName" {...register('firstName')} className="w-full" disabled={!isEditing} />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <Label htmlFor="lastName">นามสกุล</Label>
                                                <Input id="lastName" {...register('lastName')} className="w-full" disabled={!isEditing} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-3">
                                            <div className="flex flex-col w-full">
                                                <Label htmlFor="nickName">ชื่อเล่น</Label>
                                                <Input id="nickName" {...register('nickName')} className="w-full" disabled={!isEditing} />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <Label htmlFor="birthDate">วันเกิด</Label>
                                                <Controller control={control} name="birthDate" render={({ field }) => (
                                                    <DatePicker
                                                        id="birthDate"
                                                        selected={field.value}
                                                        onChange={(date: Date | null) => field.onChange(date)}
                                                        dateFormat="dd/MM/yyyy"
                                                        className="w-full h-[49px] p-[12px] rounded-[4px] backdrop-blur-[8px] transition duration-200 bg-[#00000052] text-[var(--color-font)] placeholder-[var(--color-font)] border border-transparent hover:border-[#FFD000] hover:text-[#FFD000] hover:placeholder-[#FFD000] active:border-[#FFFFFF] active:text-[#FFFFFF] active:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#1A1A1A]"
                                                        disabled={!isEditing}
                                                        locale="th"
                                                    />
                                                )} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-3">
                                            <div className="flex flex-col w-full">
                                                <Label htmlFor="departmentId">แผนก</Label>
                                                <Controller name="departmentId" control={control} render={({ field }) => (
                                                    <SelectField
                                                        id="departmentId"
                                                        label="แผนก"
                                                        name="departmentId"
                                                        options={(departments?.data || []).map(d => ({ value: d.id, label: d.name }))}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        disabled={!isEditing}
                                                        placeholder="เลือกแผนก"
                                                        required
                                                    />
                                                )} />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <Label htmlFor="jobTitleId">ตำแหน่ง</Label>
                                                <Controller name="jobTitleId" control={control} render={({ field }) => (
                                                    <SelectField
                                                        id="jobTitleId"
                                                        label="ตำแหน่ง"
                                                        name="jobTitleId"
                                                        options={(jobTitles?.data || []).map(d => ({ value: d.id, label: d.name }))}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        disabled={!isEditing}
                                                        placeholder="เลือกตำแหน่ง"
                                                        required
                                                    />
                                                )} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end px-5 pb-5 mt-4">
                                        <PrimaryButton type="submit" disabled={userMutation.isPending}>
                                            {userMutation.isPending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Right panel: leave & items */}
                    <div className="flex flex-col gap-5">
                        {/* Leave balance */}
                        <div className="w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10 px-5 py-5">
                            <div className="flex flex-row gap-x-6">
                                {leaveBalance.map((lt, idx) => (
                                    <div key={lt.id} className="flex items-center">
                                        <div className="flex flex-col min-w-[120px] max-w-[144px]">
                                            <p className="font-sukhumvit text-[20px] font-bold">{lt.name}</p>
                                            <div className="flex justify-end space-x-1">
                                                <p className={`text-[32px] font-sukhumvit font-bold ${lt.used_days > lt.max_days ? "text-red-500" : "text-primary"}`}>{lt.used_days}</p>
                                                <p className="text-[32px] font-sukhumvit font-bold text-primary">/{lt.max_days}</p>
                                            </div>
                                        </div>
                                        {idx !== leaveBalance.length - 1 && <div className="w-px h-[72px] bg-white opacity-30 mx-3" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Leave history */}
                        <div className="flex flex-col">
                            <div className="flex flex-row w-full max-w-6xl rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
                                <div className="flex flex-col w-full py-5 px-5">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-sukhumvit text-[20px] font-bold">ประวัติการลา</p>
                                        <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={toggleLeaveModal}>
                                            <CalendarIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
                                            <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">ดูทั้งหมด</p>
                                        </div>
                                    </div>
                                    {leaveData.map((leave, index) => (
                                        <div key={index} className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between">
                                            <div className="w-[110px]"><p className="font-sukhumvit text-[16px] text-white">{leave.title}</p></div>
                                            <div className="w-[178px]"><p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.description}</p></div>
                                            <div className="flex flex-row items-center w-[168px]">
                                                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{new Date(leave.startDate).toISOString().split('T')[0]}</p>
                                                <ArrowIcon className="fill-white" />
                                                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{new Date(leave.endDate).toISOString().split('T')[0]}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Items history */}
                        <div className="flex flex-col">
                            <div className="flex flex-row w-full max-w-6xl rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
                                <div className="flex flex-col w-full py-5 px-5">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-sukhumvit text-[20px] font-bold">ประวัติยืมอุปกรณ์</p>
                                        <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={toggleItemsModal}>
                                            <ComputerIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
                                            <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">ดูทั้งหมด</p>
                                        </div>
                                    </div>
                                    {itemsRequest?.data?.map((item, index) => (
                                        <div key={index} className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between">
                                            <div className="w-[232px]"><p className="font-sukhumvit text-[16px] text-white">{item.item.name}</p></div>
                                            <div className="w-[68px]"><p className="font-sukhumvit-semibold text-[14px] text-white">จำนวน {item.quantity}</p></div>
                                            <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{new Date(item.createdAt).toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' })}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
