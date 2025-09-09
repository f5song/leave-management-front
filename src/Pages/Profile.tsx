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
import { useEffect, useState } from "react";
import LeaveModal from "@/Components/Modals/LeaveModal";
import FacilitiesModal from "@/Components/Modals/FacilitiesModal";
import { useAuth } from "@/Context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getLeavesByUser, getLeaveType } from "@/Api/leave-service";
import { getItemsRequest } from "@/Api/items-requests-service";
import { getUserLeaves, updateUser } from "@/Api/users-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ItemsModal from "@/Components/Modals/ItemsModal";


const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    console.log("user:", user);

    const [isEditing, setIsEditing] = useState(false);
    const toggleEditing = () => setIsEditing((prev) => !prev);

    const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
    const [isItemsModalOpen, setItemsModalOpen] = useState(false);

    const toggleLeaveModal = () => setLeaveModalOpen(!isLeaveModalOpen);
    const toggleItemsModal = () => setItemsModalOpen(!isItemsModalOpen);

    const queryClient = useQueryClient();


    const { data: departments = [] } = useQuery({
        queryKey: ['departments'],
        queryFn: getDepartments
    });

    const { data: jobTitles = [] } = useQuery({
        queryKey: ['jobTitles'],
        queryFn: getJobTitles
    });

    const { data: { data: leaveData = [] } = {} } = useQuery({
        queryKey: ['leaveData'],
        queryFn: () => getLeavesByUser(user?.id || ''),
    });

    const { data: { data: itemsRequest = [] } = {} } = useQuery({
        queryKey: ['itemsRequest'],
        queryFn: () => getItemsRequest(undefined, undefined, user?.id || ''),
    });

    const { data: leaveBalance = [] } = useQuery({
        queryKey: ['leaveBalance'],
        queryFn: () => getUserLeaves(user?.id || ''),
    });

    console.log("itemsRequest profile", itemsRequest);
    const mutation = useMutation({
        mutationFn: (data: ProfileData) => updateUser(user?.id!, data),
        onSuccess: () => {
            console.log('อัปเดตข้อมูลสำเร็จ');
            queryClient.invalidateQueries({ queryKey: ['user', user?.id] });
            alert('อัปเดตข้อมูลสำเร็จ');
        },
        onError: (err: any) => {
            console.log(err);
            alert(`อัปเดตไม่สำเร็จ: ${err.message}`);
        },
    });

    const schema = z.object({
        firstName: z.string().min(2, { message: 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร' }).max(20, { message: 'ชื่อต้องมีไม่เกิน 20 ตัวอักษร' }),
        lastName: z.string().min(2, { message: 'นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร' }).max(20, { message: 'นามสกุลต้องมีไม่เกิน 20 ตัวอักษร' }),
        email: z.string().email({ message: 'กรุณากรอกอีเมลที่ถูกต้อง' }),
        departmentId: z.string().min(1, { message: 'กรุณาเลือกแผนก' }),
        jobTitleId: z.string().min(1, { message: 'กรุณาเลือกตำแหน่ง' }),
        nickName: z.string().min(2, { message: 'ชื่อเล่นต้องมีอย่างน้อย 2 ตัวอักษร' }).max(20, { message: 'ชื่อเล่นต้องมีไม่เกิน 20 ตัวอักษร' }),
        birthDate: z.string().min(1, { message: 'กรุณาเลือกวันเกิด' }),
        avatar: z.string().optional(),
        role: z.string(),
    });

    type ProfileData = z.infer<typeof schema>;

    const {
        control,
        register,
        setValue,
        handleSubmit,
        reset
    } = useForm<ProfileData>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            departmentId: user?.departmentId || '',
            jobTitleId: user?.jobTitleId || '',
            nickName: user?.nickName || '',
            birthDate: user?.birthDate || '',
            avatar: user?.avatarUrl || '',
            role: 'employee',
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
                birthDate: user.birthDate || '',
                avatar: user.avatarUrl || '',
                role: 'employee',
            });
        }
    }, [user, reset]);

    const onSubmit = (data: ProfileData) => {
        console.log("onsubmit:data", data); // ดูว่าได้ค่าจากฟอร์มหรือยัง
        mutation.mutate(data);
    };


    // if (!user)
    //     (
    //         console.log("user is not found on profile"),
    //         console.log("user role", user?.role),
    //         console.log("user", user),
    //         <div>กำลังโหลด...</div>
    //     )
    // else
    //     (
    //         console.log("user is found on profile"),
    //         console.log("user role", user?.role),
    //         console.log("user", user),
    //         <div>กำลังโหลด...</div>
    //     );



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
                                        src={user?.avatarUrl}
                                        alt=""
                                    />
                                </div>

                                {/* ฟอร์ม */}
                                <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit(onSubmit, (errors) => {
                                    console.log("form errors:", errors);
                                })}
                                >
                                    {/* เปลี่ยนแท็ก p เป็น Label */}
                                    <div className="flex flex-col w-full gap-3">
                                        <div className="w-full">
                                            <p className="text-[16px] text-white font-sukhumvit">อีเมล</p>
                                            <Input {...register('email')} className="w-full" disabled={!isEditing} />
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-3">
                                            <div className="flex flex-col w-full">
                                                <p className="text-[16px] text-white font-sukhumvit">ชื่อจริง</p>
                                                <Input {...register('firstName')} className="w-full" disabled={!isEditing} />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <p className="text-[16px] text-white font-sukhumvit">นามสกุล</p>
                                                <Input {...register('lastName')} className="w-full" disabled={!isEditing} />
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-3">
                                            <div className="flex flex-col w-full">
                                                <p className="text-[16px] text-white font-sukhumvit">ชื่อเล่น</p>
                                                <Input {...register('nickName')} disabled={!isEditing} />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <Label htmlFor="birthDate">วันเกิด</Label>
                                                <DatePicker
                                                    selected={user?.birthDate ? new Date(user.birthDate) : null}
                                                    onChange={(date: Date) => setValue('birthDate', date?.toString() || '')}
                                                    dateFormat="dd/MM/yyyy"
                                                    className=" w-full h-[49px] p-[12px] rounded-[4px] backdrop-blur-[8px] transition duration-200 bg-[#00000052] text-[var(--color-font)] placeholder-[var(--color-font)] border border-transparent hover:border-[#FFD000] hover:text-[#FFD000] hover:placeholder-[#FFD000] active:border-[#FFFFFF] active:text-[#FFFFFF] active:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#1A1A1A]"
                                                    disabled={!isEditing}
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
                                    {/* ปุ่มบันทึก */}
                                    <div className="flex justify-end px-5 pb-5 mt-4">
                                        <PrimaryButton
                                            type="submit"
                                        >
                                            {mutation.isPending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                                        </PrimaryButton>

                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>



                    {/* right */}
                    <div className="flex flex-col">
                        {/* leaves count */}
                        <div className="w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10 px-5 py-5">
                            <div className="flex flex-row gap-x-6">
                                {leaveBalance.map((lt, idx) => (
                                    <div key={lt.id} className="flex items-center">
                                        {/* Item column */}
                                        <div className="flex flex-col min-w-[120px] max-w-[144px]">
                                            <p className="font-sukhumvit text-[20px] font-bold">{lt.name}</p>
                                            <div className="flex justify-end space-x-1">
                                                <p
                                                    className={`text-[32px] font-sukhumvit font-bold ${lt.used_days > lt.max_days ? "text-red-500" : "text-primary"
                                                        }`}
                                                >
                                                    {lt.used_days}
                                                </p>
                                                <p className="text-[32px] font-sukhumvit font-bold text-primary">
                                                    /{lt.max_days}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Divider ยกเว้น item สุดท้าย */}
                                        {idx !== leaveBalance.length - 1 && (
                                            <div className="w-px h-[72px] bg-white opacity-30 mx-3" />
                                        )}
                                    </div>
                                ))}

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
                                        <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={toggleLeaveModal}>
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
                                                <p className="font-sukhumvit text-[16px] text-white">{leave.title}</p>
                                            </div>
                                            <div className="w-[178px]">
                                                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.description}</p>
                                            </div>
                                            <div className="flex flex-row items-center w-[168px]">
                                                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">
                                                    {new Date(leave.startDate).toISOString().split('T')[0]}
                                                </p>
                                                <ArrowIcon className="fill-white" />
                                                <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">
                                                    {new Date(leave.endDate).toISOString().split('T')[0]}
                                                </p>
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
                                        <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={toggleItemsModal}>
                                            <ComputerIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
                                            <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">ดูทั้งหมด</p>
                                        </div>
                                    </div>

                                    {itemsRequest?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between"
                                        >
                                            <div className="w-[232px]">
                                                <p className="font-sukhumvit text-[16px] text-white">{item.item.name}</p>
                                            </div>
                                            <div className="w-[68px]">
                                                <p className="font-sukhumvit-semibold text-[14px] text-white">จำนวน {item.quantity}</p>
                                            </div>
                                            <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">
                                                {new Date(item.createdAt).toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' })}
                                            </p>
                                        </div>
                                    ))}


                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        </div >
    );
};

export default Profile;

