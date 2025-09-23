import Label from "@/Components/Label"
import Input from "@/Components/Input"
import PrimaryButton from "@/Components/PrimaryButton"
import SelectField from "@/Components/SelectField"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useProfileForm } from "@/Hook/useProfileForm"
import { useProfileData } from "@/Hook/useProfileData"
import { useAuth } from "@/Context/AuthContext"

type ProfileFormProps = {
    isEditing: boolean;
};

export const ProfileForm = ({ isEditing }: ProfileFormProps) => {
    const { user } = useAuth()
    const { departments, jobTitles } = useProfileData()
    const { 
        form, 
        onSubmit, 
        Controller, 
        isSubmitting, 
        previewAvatar, 
        handleAvatarChange,
        mutationStatus 
    } = useProfileForm()
    
    const {
        register,
        handleSubmit,
        control,
        errors
    } = form
        
    console.log("🔄 ProfileForm State:", {
        isSubmitting,
        isEditing,
        isPending: mutationStatus.isPending,
        hasErrors: Object.keys(errors).length > 0,
        errors
    });

    // แสดงสถานะการส่งข้อมูล
    if (mutationStatus.isPending) {
        console.log("⏳ กำลังส่งข้อมูล...");
    }

    return (
        <div className="flex flex-col lg:flex-row pt-4 gap-5">
            {/* Avatar */}
            <div className="flex flex-col">
                <p className="font-sukhumvit text-[16px]">รูปพนักงาน</p>
                {/* container ที่มี relative + group */}
                <div className="relative">
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
            <form 
                className="flex flex-col w-full gap-3" 
                onSubmit={(e) => {
                    console.log("📝 Form submit triggered");
                    handleSubmit(onSubmit)(e);
                }}
            >
                <div className="flex flex-col w-full gap-3">
                    <div className="w-full">
                        <Label htmlFor="email">อีเมล</Label>
                        <Input 
                            id="email" 
                            {...register('email')} 
                            className="w-full" 
                            disabled
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex flex-col w-full">
                            <Label htmlFor="firstName">ชื่อจริง</Label>
                            <Input 
                                id="firstName" 
                                {...register('firstName')} 
                                className="w-full" 
                                disabled={!isEditing} 
                            />
                            {errors.firstName && (
                                <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            <Label htmlFor="lastName">นามสกุล</Label>
                            <Input 
                                id="lastName" 
                                {...register('lastName')} 
                                className="w-full" 
                                disabled={!isEditing} 
                            />
                            {errors.lastName && (
                                <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex flex-col w-full">
                            <Label htmlFor="nickName">ชื่อเล่น</Label>
                            <Input 
                                id="nickName" 
                                {...register('nickName')} 
                                className="w-full" 
                                disabled={!isEditing} 
                            />
                            {errors.nickName && (
                                <span className="text-red-500 text-sm">{errors.nickName.message}</span>
                            )}
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
                            {errors.birthDate && (
                                <span className="text-red-500 text-sm">{errors.birthDate.message}</span>
                            )}
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
                                        options={(departments || []).map(d => ({ value: d.id, label: d.name }))}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={!isEditing}
                                        placeholder="เลือกแผนก"
                                        required
                                    />
                                )} 
                            />
                            {errors.departmentId && (
                                <span className="text-red-500 text-sm">{errors.departmentId.message}</span>
                            )}
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
                                        options={(jobTitles || []).map(d => ({ value: d.id, label: d.name }))}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={!isEditing}
                                        placeholder="เลือกตำแหน่ง"
                                        required
                                    />
                                )} 
                            />
                            {errors.jobTitleId && (
                                <span className="text-red-500 text-sm">{errors.jobTitleId.message}</span>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* แสดงปุ่มบันทึกเฉพาะตอนแก้ไข */}
                {isEditing && (
                    <div className="flex justify-end px-5 pb-5 mt-4">
                        <PrimaryButton 
                            type="submit" 
                            disabled={isSubmitting}
                            onClick={() => console.log("🔘 ปุ่มบันทึกถูกคลิก")}
                        >
                            {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                        </PrimaryButton>
                    </div>
                )}
                
                {/* แสดง Error Message */}
                {mutationStatus.isError && (
                    <div className="text-red-500 text-center p-2">
                        เกิดข้อผิดพลาด: {mutationStatus.error?.message}
                    </div>
                )}
            </form>
        </div>
    )
}