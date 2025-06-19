import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, ArrowLeft, Building2, CalendarIcon } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createUser } from '@/services/userService';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '',
    jobTitleId: '',
    nickName: '',
    // avatar: '',
    birthDate: null,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const googleData = location.state?.googleData;

  console.log("googleData in Register", googleData);

  useEffect(() => {
    if (googleData) {
      const nameParts = googleData.name?.split(' ') || [];
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: googleData.email || '',
        // avatar: googleData.avatar || '',
      }));
    }
  }, [googleData]);

  // console.log("googleData in Register ", googleData?.avatar);

  const registerMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      login(data.user.id, data.access_token);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.departmentId || !formData.jobTitleId || !formData.nickName || !formData.birthDate) {
      toast({
        title: "ข้อมูลไม่ครบ",
        description: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        variant: "destructive",
      });
      return;
    }

    const userData = {
      ...formData,
      googleId: googleData?.id,
    };

    registerMutation.mutate(userData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  console.log("formData", formData);
  console.log("googleData", googleData?.email);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-2xl">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Funch.tech
              </h1>
            </div>
          </div>
        </div>

        <Card className="bg-black/40 border-orange-500/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="absolute left-4 top-4 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl font-bold text-white pt-4">
              {googleData ? 'ลงทะเบียนข้อมูลเพิ่มเติม' : 'สมัครสมาชิก'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {googleData ? 'กรอกข้อมูลเพิ่มเติมเพื่อใช้งานระบบ' : 'สร้างบัญชีใหม่สำหรับระบบลางาน'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-200">ชื่อ *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="bg-black/50 border-orange-500/30 text-white"
                    placeholder="ชื่อ"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-200">นามสกุล *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="bg-black/50 border-orange-500/30 text-white"
                    placeholder="นามสกุล"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nickname" className="text-gray-200">ชื่อเล่น *</Label>
                  <Input
                    id="nickname"
                    value={formData.nickName}
                    onChange={(e) => handleInputChange('nickName', e.target.value)}
                    className="bg-black/50 border-orange-500/30 text-white"
                    placeholder="ชื่อเล่น"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth_date" className="text-gray-200">วันเกิด *</Label>
                  <div className="relative">
                    <DatePicker
                      id="birth_date"
                      selected={formData.birthDate}
                      onChange={(date: Date) => handleInputChange('birthDate', date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="เลือกวันเกิด"
                      className="w-full pl-10 pr-4 py-2 rounded-md bg-black/50 border border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/40 focus:outline-none"
                    />
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">อีเมล *</Label>
                <Input
                  id="email"
                  type="email"
                  value={googleData?.email}
                  disabled
                  className="bg-black/30 border border-orange-500/20 text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-gray-200">แผนก *</Label>
                <select
                  id="department"
                  value={formData.departmentId}
                  onChange={(e) => handleInputChange('departmentId', e.target.value)}
                  className="w-full bg-black/50 border border-orange-500/30 text-white p-2 rounded-md"
                  required
                >
                  <option value="">เลือกแผนก</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-gray-200">ตำแหน่ง *</Label>
                <select
                  id="jobTitle"
                  value={formData.jobTitleId}
                  onChange={(e) => handleInputChange('jobTitleId', e.target.value)}
                  className="w-full bg-black/50 border border-orange-500/30 text-white p-2 rounded-md"
                  required
                >
                  <option value="">เลือกตำแหน่ง</option>
                  <option value="DEPARTMENT_HEAD">Department Head</option>
                  <option value="STAFF">Staff</option>
                </select>
              </div>


              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-12 text-lg font-medium shadow-lg"
                disabled={registerMutation.isPending}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                {registerMutation.isPending ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {!googleData && (
          <div className="text-center mt-6">
            <p className="text-gray-400">
              มีบัญชีแล้ว?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-orange-400 hover:text-orange-300 font-medium"
              >
                เข้าสู่ระบบ
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
