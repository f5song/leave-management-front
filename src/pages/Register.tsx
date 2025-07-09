import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/Contexts/AuthContext';
import { toast } from '@/Hooks/UseToast';
import { createUser } from '@/Api/user-service';
// import Label from '@/components/ui/label'
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import SelectField from '@/Components/SelectField';
import PrimaryButton from '@/Components/PrimaryButton';
import { getJobTitles } from '@/Api/job-title-service';
import { getDepartments } from '@/Api/department-service';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '',
    jobTitleId: '',
    nickName: '',
    birthDate: null,
    roleId: 'employee',
    googleId: '',
    salary: 0,
    avatar: '',
  });

  const [avatar, setavatar] = useState<File | null>(null);



  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const googleData = location.state?.googleData;
  const {
    data: departments = [],
  } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
  });

  const {
    data: jobTitles = [],
  } = useQuery({
    queryKey: ['jobTitles'],
    queryFn: getJobTitles,
  });

  console.log("department", departments);
  console.log("jobTitles", jobTitles);


  useEffect(() => {
    if (googleData) {
      const nameParts = googleData.name?.split(' ') || [];
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: googleData.email || '',
        googleId: googleData.googleId,
      }));
    }
  }, [googleData]);

  const registerMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (res) => {
      const { user, access_token } = res.data;
      login(user, access_token);
      navigate('/home');
      toast({
        title: "สมัครสมาชิกสำเร็จ",
        description: "ยินดีต้อนรับสู่ระบบลางาน Funch.tech",
      });
    },
    onError: (error: any) => {
      toast({
        title: "สมัครสมาชิกไม่สำเร็จ",
        description: error.message || "กรุณาตรวจสอบข้อมูลและลองใหม่",
        variant: "destructive",
      });
    }
  });




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      departmentId,
      jobTitleId,
      nickName,
      birthDate,
      googleId,
      salary,
    } = formData;

    if (!firstName || !lastName || !email || !departmentId || !jobTitleId || !nickName || !birthDate || salary === null || salary === undefined || !googleId || !avatar) {
      toast({
        title: "ข้อมูลไม่ครบ",
        description: "กรุณากรอกข้อมูลให้ครบทุกช่อง จ้าาาา",
        variant: "destructive",
      });
      return;
    }

    const form = new FormData();
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('email', email);
    form.append('departmentId', departmentId);
    form.append('jobTitleId', jobTitleId);
    form.append('nickName', nickName);
    form.append('birthDate', birthDate);
    form.append('roleId', 'employee');
    form.append('googleId', googleId);
    form.append('salary', salary.toString());
    form.append('avatar', avatar); // ✅ ส่งไฟล์จริง

    registerMutation.mutate(form);
  };


  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  useEffect(() => {
    console.log("formData:", formData);
  }, [formData]);

  useEffect(() => {
    console.log("avatarFile:", avatar);
  }, [avatar]);

  // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const result = event.target?.result;
  //       if (result) {
  //         setFormData(prev => ({ ...prev, avatar: result }));
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setavatar(file); // เก็บไว้ใช้ตอน submit
      const previewUrl = URL.createObjectURL(file); // preview รูป
      setFormData(prev => ({
        ...prev,
        avatar: previewUrl, // สำหรับ preview
      }));
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
            <img
              src="/Frame 58.svg"
              alt="logo"
              className="w-[200px] md:w-[276px] h-[53px] object-contain"
            />
            <p className="font-sukhumvit text-[20px] md:text-[24px] font-bold text-center md:text-right">
              กรอกข้อมูลส่วนตัวเพิ่มเติม
            </p>
          </div>

          <div className="border-t border-white opacity-20 w-full my-6" />
          <form onSubmit={handleSubmit}>

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
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setavatar(file);
                        const previewUrl = URL.createObjectURL(file);
                        setFormData(prev => ({ ...prev, avatar: previewUrl }));
                      }
                    }}
                  />


                </div>
              </div>


              {/* form section */}
              <div className="flex flex-col gap-6 text-white font-sukhumvit w-full">

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <Label>อีเมล*</Label>
                  <Input
                    type="email"
                    placeholder={googleData?.email || "อีเมลของคุณ"}
                    disabled
                    className="w-full h-[49px] p-[12px] rounded-[4px] bg-[rgba(0,0,0,0.12)] 
              backdrop-blur-[8px] text-[var(--color-font)] placeholder-[var(--color-font)] cursor-not-allowed"
                  />
                </div>

                {/* ชื่อจริง + นามสกุล */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <Label>ชื่อจริง*</Label>
                    <Input
                      type="text"
                      placeholder="กรอกชื่อ"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label>นามสกุล*</Label>
                    <Input
                      type="text"
                      placeholder="กรอกนามสกุล"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                {/* ชื่อเล่น + วันเกิด */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <Label>ชื่อเล่น*</Label>
                    <Input
                      type="text"
                      placeholder="กรอกชื่อเล่น"
                      value={formData.nickName}
                      onChange={(e) => handleInputChange("nickName", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label>วันเกิด*</Label>
                    <Input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    />
                  </div>
                </div>

                {/* แผนก + ตำแหน่ง */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <SelectField
                      label="แผนก"
                      name="department"
                      value={formData.departmentId}
                      options={(departments?.data || []).map((d: any) => ({
                        value: d.id,
                        label: d.name,
                      }))}
                      onChange={(value) => handleInputChange('departmentId', value)}
                      required
                    />

                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <SelectField
                      label="ตำแหน่ง"
                      name="jobTitle"
                      value={formData.jobTitleId}
                      options={(jobTitles?.data || []).map((j: any) => ({
                        value: j.id,
                        label: j.name,
                      }))}
                      onChange={(value) => handleInputChange('jobTitleId', value)}
                      required
                    />

                  </div>
                </div>

              </div>
            </div>
            <div className="flex flex-row justify-end gap-6 mt-9">
              <button className="h-[49px] p-[12px] rounded-[4px] text-[var(--color-primary)] font-sukhumvit text-[16px] font-bold">ยกเลิก</button>
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
