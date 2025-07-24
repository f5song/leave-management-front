import BackgroundGradient from "@/Components/BackgroundGradient";
import Navbar from "@/Components/Navbar";
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectField from "@/Components/SelectField";
import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "@/Api/departments-service";
import { getJobTitles } from "@/Api/job-title-service";
import { ArrowIcon, BackIcon, CalendarIcon, ComputerIcon, EditIcon } from "@/Shared/Asseet/Icons";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import BaseModal from "@/Components/BaseModals";

// mock data
const leaveData = [
    {
        type: 'ลากิจ 2 วัน',
        reason: 'ลาไปทำระทุ',
        startDate: '26-07-2026',
        endDate: '28-07-2026',
    },
    {
        type: 'ลาป่วย 1 วัน',
        reason: 'เป็นไข้',
        startDate: '01-08-2026',
        endDate: '01-08-2026',
    },
    {
        type: 'ลาพักร้อน 3 วัน',
        reason: 'ไปเที่ยวทะเล',
        startDate: '10-08-2026',
        endDate: '12-08-2026',
    },
    {
        type: 'ลาพักร้อน 3 วัน',
        reason: 'ไปเที่ยวทะเล',
        startDate: '10-08-2026',
        endDate: '12-08-2026',
    },
];

const facilitiesData = [
    {
        name: 'MACKBOOK',
        quantity: 'จำนวน 1',
        timeStamp: '26-07-2026 12:30',
    },
    {
        name: 'Adobe Creative Cloud',
        quantity: 'จำนวน 1',
        timeStamp: '26-07-2026 12:30',
    },
    {
        name: 'Midjourney Image Generator AI',
        quantity: 'จำนวน 1',
        timeStamp: '26-07-2026 12:30',
    },
    {
        name: 'CHAT GPT',
        quantity: 'จำนวน 1',
        timeStamp: '26-07-2026 12:30',
    },


];




const schema = z.object({
    firstName: z.string().min(2, 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'),
    lastName: z.string().min(2, 'นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร'),
    email: z.string().email('กรุณากรอกอีเมลที่ถูกต้อง'),
    departmentId: z.string().min(1, 'กรุณาเลือกแผนก'),
    jobTitleId: z.string().min(1, 'กรุณาเลือกตำแหน่ง'),
    nickName: z.string().min(2, 'ชื่อเล่นต้องมีอย่างน้อย 2 ตัวอักษร'),
    birthDate: z.string().min(1, 'กรุณาเลือกวันเกิด'),
    googleId: z.string().min(1, 'กรุณากรอกรหัส Google'),
    avatar: z.string().optional(),
});

const Profile = () => {
    const navigate = useNavigate();
    type ProfileData = z.infer<typeof schema>;
    const {
        control,
        register,
    } = useForm<ProfileData>({
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

    const { data: departments = [] } = useQuery({ queryKey: ['departments'], queryFn: getDepartments });
    const { data: jobTitles = [] } = useQuery({ queryKey: ['jobTitles'], queryFn: getJobTitles });

    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        setIsEditing((prev) => !prev);
    };

    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!isModalOpen);

    return (
        <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
            <BaseModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                data={{ title: 'ประวัติการลา' }}
            />
            <Navbar onClick={() => navigate('/home')} />
            <BackgroundGradient />

            <div className="flex flex-col pt-10">
                {/* หัวข้อ */}
                <div className="flex flex-row justify-between border-b border-[#676767] w-full my-6">
                    <p className="font-sukhumvit text-[28px] md:text-[36px] font-bold text-center">
                        โปรไฟล์
                    </p>
                </div>

                {/* เนื้อหา */}
                <div className="flex flex-col xl:flex-row gap-5">
                    {/* left panel */}
                    <div className="flex flex-col w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
                        <div className="flex flex-col w-full px-5 pt-5">
                            <div className="flex flex-row justify-between">
                                <p className="font-sukhumvit text-[20px] font-bold ">
                                    ข้อมูลพนักงาน
                                </p>
                                <div className="flex flex-row items-center cursor-pointer group hover:text-white"
                                    onClick={toggleEditing}>
                                    <EditIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
                                    <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">
                                        {isEditing ? 'ยกเลิก' : 'แก้ไขข้อมูล'}
                                    </p>
                                </div>
                            </div>

                            {/* <LeaveHistoryModal
                                isOpen={isModalOpen}
                                onClose={() => setModalOpen(false)}
                                data={leaveData}
                            /> */}


                            {/* รูปภาพ + ข้อมูล */}
                            <div className="flex flex-col lg:flex-row pt-4 gap-5">
                                {/* รูป */}
                                <div className="flex flex-col">
                                    <p className="font-sukhumvit text-[16px]">รูปพนักงาน</p>
                                    <img
                                        className="w-[160px] h-[160px] rounded-[4px] border border-[#000000]"
                                        src=""
                                        alt=""
                                    />
                                </div>

                                {/* ฟอร์ม */}
                                <div className="flex flex-col w-full gap-3">
                                    <div className="w-full">
                                        <p className="text-[16px] text-white font-sukhumvit">อีเมล</p>
                                        <Input className="w-full text-white" {...register('email')} disabled={!isEditing} />
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-3">
                                        <div className="flex flex-col w-full">
                                            <p className="text-[16px] text-white font-sukhumvit">ชื่อจริง</p>
                                            <Input className="text-white" {...register('firstName')} disabled={!isEditing} />
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <p className="text-[16px] text-white font-sukhumvit">นามสกุล</p>
                                            <Input className="text-white" {...register('lastName')} disabled={!isEditing} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-3">
                                        <div className="flex flex-col w-full">
                                            <p className="text-[16px] text-white font-sukhumvit">ชื่อเล่น</p>
                                            <Input className="text-white" {...register('nickName')} disabled={!isEditing} />
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <p className="text-[16px] text-white font-sukhumvit">วันเกิด</p>
                                            <Input className="text-white" type="date" {...register('birthDate')} disabled={!isEditing} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-3">
                                        <div className="flex flex-col w-full">
                                            <p className="text-[16px] text-white font-sukhumvit">แผนก</p>
                                            <Controller
                                                name="departmentId"
                                                control={control}
                                                render={({ field }) => (
                                                    <SelectField
                                                        className="text-white"
                                                        label="แผนก"
                                                        name="departmentId"
                                                        options={(departments?.data || []).map((d: any) => ({
                                                            value: d.id,
                                                            label: d.name,
                                                        }))}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        disabled={!isEditing}
                                                        placeholder="เลือกแผนก"
                                                        required
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <p className="text-[16px] text-white font-sukhumvit">ตำแหน่ง</p>
                                            <Controller
                                                name="jobTitleId"
                                                control={control}
                                                render={({ field }) => (
                                                    <SelectField
                                                        className="text-white"
                                                        label="ตำแหน่ง"
                                                        name="jobTitleId"
                                                        options={(jobTitles?.data || []).map((d: any) => ({
                                                            value: d.id,
                                                            label: d.name,
                                                        }))}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        disabled={!isEditing}
                                                        placeholder="เลือกตำแหน่ง"
                                                        required
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-full">

                        </div>

                        {/* ปุ่มบันทึก */}
                        <div className="flex justify-end px-5 pb-5 mt-4">
                            <PrimaryButton disabled={!isEditing}>บันทึก</PrimaryButton>
                        </div>
                    </div>


                    {/* right */}
                    <div className="flex flex-col">
                        {/* leaves count */}
                        <div className="w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10 px-5 py-5">
                            <div className="flex flex-wrap sm:flex-nowrap justify-between gap-x-6 gap-y-4 w-full">
                                {/* ลาพักร้อน */}
                                <div className="flex flex-col min-w-[120px] max-w-[144px] flex-1">
                                    <p className="font-sukhumvit text-[20px] font-bold">ลาพักร้อน</p>
                                    <div className="flex justify-end space-x-1">
                                        <p className="text-[32px] font-sukhumvit font-bold text-primary">0</p>
                                        <p className="text-[32px] font-sukhumvit font-bold text-primary">/5</p>
                                    </div>
                                </div>

                                {/* เส้นคั่น */}
                                <div className="hidden sm:flex w-px h-[72px] bg-white opacity-30 my-auto" />

                                {/* ลาป่วย */}
                                <div className="flex flex-col min-w-[120px] max-w-[144px] flex-1">
                                    <p className="font-sukhumvit text-[20px] font-bold">ลาป่วย</p>
                                    <div className="flex justify-end space-x-1">
                                        <p className="text-[32px] font-sukhumvit font-bold text-[#ED363F]">6</p>
                                        <p className="text-[32px] font-sukhumvit font-bold text-primary">/5</p>
                                    </div>
                                </div>

                                {/* เส้นคั่น */}
                                <div className="hidden sm:flex w-px h-[72px] bg-white opacity-30 my-auto" />

                                {/* ลากิจ */}
                                <div className="flex flex-col min-w-[120px] max-w-[144px] flex-1">
                                    <p className="font-sukhumvit text-[20px] font-bold">ลากิจ</p>
                                    <div className="flex justify-end space-x-1">
                                        <p className="text-[32px] font-sukhumvit font-bold text-primary">3</p>
                                        <p className="text-[32px] font-sukhumvit font-bold text-primary">/5</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* leaves history */}
                        <div className="flex flex-col pt-5">
                            <div className="flex flex-row w-full max-w-6xl rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
                                <div className="flex flex-col w-full  py-5 px-5">
                                    {/* header */}
                                    <div className="flex flex-row justify-between">
                                        <p className="font-sukhumvit text-[20px] font-bold ">
                                            ประวัติการลา
                                        </p>
                                        <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={toggleModal}>
                                            <CalendarIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
                                            <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">ดูทั้งหมด</p>
                                        </div>
                                    </div>



                                    {leaveData.map((leave, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between"
                                        >
                                            <div className="w-[110px]">
                                                <p className="font-sukhumvit text-[16px] text-white">{leave.type}</p>
                                            </div>
                                            <div className="w-[178px]">
                                                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.reason}</p>
                                            </div>
                                            <div className="flex flex-row items-center w-[168px]">
                                                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.startDate}</p>
                                                <ArrowIcon className="fill-white" />
                                                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.endDate}</p>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </div>
                        </div>
                        {/* facilities history */}
                        <div className="flex flex-col pt-5">
                            <div className="flex flex-row w-full max-w-6xl rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
                                <div className="flex flex-col w-full  py-5 px-5">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-sukhumvit text-[20px] font-bold ">
                                            ประวัติยืมอุปกรณ์
                                        </p>
                                        <div className="flex flex-row items-center cursor-pointer group hover:text-white">
                                            <ComputerIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
                                            <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">ดูทั้งหมด</p>
                                        </div>

                                    </div>

                                    {facilitiesData.map((facility, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between"
                                        >
                                            <div className="w-[232px]">
                                                <p className="font-sukhumvit text-[16px] text-white">{facility.name}</p>
                                            </div>
                                            <div className="w-[68px]">
                                                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{facility.quantity}</p>
                                            </div>
                                            <div className="flex flex-row items-center w-[120px]">
                                                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{facility.timeStamp}</p>
                                            </div>
                                            <BackIcon className="w-[24px] h-[24px]" />
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
