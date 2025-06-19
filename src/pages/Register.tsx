
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, ArrowLeft, Building2 } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: ''
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const googleData = location.state?.googleData;

  // Set initial data from Google if available
  useState(() => {
    if (googleData) {
      const nameParts = googleData.name?.split(' ') || [];
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: googleData.email || ''
      }));
    }
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      login(data.user, data.token);
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

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.department || !formData.position) {
      toast({
        title: "ข้อมูลไม่ครบ",
        description: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        variant: "destructive",
      });
      return;
    }

    // Mock successful registration
    const mockUser = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      department: formData.department,
      position: formData.position,
      avatar: googleData?.picture || `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=f97316&color=ffffff`
    };

    login(mockUser, 'mock-token');
    navigate('/home');
    toast({
      title: "สมัครสมาชิกสำเร็จ",
      description: "ยินดีต้อนรับสู่ระบบลางาน Funch.tech",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Brand */}
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
                    className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400/20"
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
                    className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400/20"
                    placeholder="นามสกุล"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">อีเมล *</Label>
                {googleData ? (
                  <div className="bg-black/30 border border-orange-500/20 rounded-md px-3 py-2">
                    <span className="text-gray-300">{googleData.email}</span>
                  </div>
                ) : (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400/20"
                    placeholder="example@company.com"
                    required
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-gray-200">แผนก *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="เช่น IT, HR, Marketing"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-gray-200">ตำแหน่ง *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="เช่น Developer, Manager"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-12 text-lg font-medium shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
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
                className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
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
